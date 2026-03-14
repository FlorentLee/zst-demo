import json
import re
import base64
from fastapi import APIRouter, Depends, HTTPException, UploadFile, File
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.models.schemas import InvoiceAnalyzeResponse
from app.services.gemini_agent import analyze_invoice_vision
from app.services.rag_engine import search_policy
from app.models.domain import LedgerItem

from typing import List

router = APIRouter()

@router.post("/analyze", response_model=List[InvoiceAnalyzeResponse])
async def analyze_invoice(file: UploadFile = File(...), db: Session = Depends(get_db)):
    # 读取图片内容并转为 base64
    content = await file.read()
    base64_img = base64.b64encode(content).decode("utf-8")
    image_url = f"data:{file.content_type};base64,{base64_img}"

    # 手动释放大对象内存
    del content
    del base64_img

    # 1. OCR 视觉解析
    raw_response = analyze_invoice_vision(image_url)
    
    # 解析完毕释放 URL
    del image_url
    
    try:
        # 增加清洗逻辑：移除 markdown 的 ```json 和 ``` 标记
        cleaned_response = raw_response.strip()
        if cleaned_response.startswith("```json"):
            cleaned_response = cleaned_response[7:]
        elif cleaned_response.startswith("```"):
            cleaned_response = cleaned_response[3:]
        if cleaned_response.endswith("```"):
            cleaned_response = cleaned_response[:-3]
        
        # 进一步使用正则提取最外层的 {} 或者 []
        import logging
        logger = logging.getLogger("invoice.analyze")
        logger.info(f"Before regex, cleaned_response: {cleaned_response}")

        # Try to find array or object
        match = re.search(r'(\[.*\]|\{.*\})', cleaned_response, re.DOTALL)
        if match:
            cleaned_response = match.group(1)
            logger.info(f"After regex match: {cleaned_response}")
        else:
            logger.warning("No JSON array or object found by regex.")
            
        parsed_data = json.loads(cleaned_response)
        
        # Add log to validate assumption
        logger.info(f"Successfully parsed JSON. Type is {type(parsed_data)}")
        
        # Ensure parsed_data is a list for uniform processing
        if not isinstance(parsed_data, list):
            parsed_data = [parsed_data]
            
        if not parsed_data:
            logger.warning("Empty list returned by AI.")
            parsed_data = [{}]
        
    except Exception as e:
        print(f"========== AI JSON 解析失败 ==========")
        print(f"Original AI response:\n{raw_response}")
        print(f"Cleaned response:\n{cleaned_response if 'cleaned_response' in locals() else 'N/A'}")
        print(f"Error details: {e}")
        print(f"=====================================")
        raise HTTPException(status_code=500, detail=f"Failed to parse OCR response as JSON. See logs for details.")
    
    responses = []
    
    for item in parsed_data:
        # 2. RAG合规政策风险查询
        risk_warning = item.get("risk_warning", "")
        invoice_type = item.get("invoice_type")
        if invoice_type:
            policy_text = search_policy(invoice_type)
            if policy_text and isinstance(policy_text, list):
                clean_policies = [re.sub(r'[#\*`]', '', p).strip() for p in policy_text]
                combined_policy = " ".join(clean_policies)
                policy_notice = f"【政策提醒: {combined_policy[:100]}...】"
                if risk_warning:
                    risk_warning = f"{risk_warning} {policy_notice}"
                else:
                    risk_warning = policy_notice
        
        # 提取总金额并做安全转换
        raw_amount = item.get("total_amount", 0.0)
        if raw_amount is None:
            raw_amount = 0.0
        try:
            total_amount = float(raw_amount)
        except (ValueError, TypeError):
            # 如果包含"元"等非数字字符，使用正则提取
            num_match = re.search(r'[\d\.]+', str(raw_amount))
            total_amount = float(num_match.group(0)) if num_match else 0.0

        # 3. 自动存入账簿
        compliance_score = float(item.get("compliance_score", 100.0) if item.get("compliance_score") is not None else 100.0)
        
        ledger_item = LedgerItem(
            invoice_number=str(item.get("invoice_number", "UNKNOWN")),
            total_amount=total_amount,
            invoice_type=invoice_type or "UNKNOWN",
            compliance_score=compliance_score,
            risk_warning=risk_warning
        )
        db.add(ledger_item)
        db.commit()
        db.refresh(ledger_item)

        # 4. 审批流判定逻辑
        workflow_status = "AUTO_BOOKED"
        if ledger_item.total_amount > 5000.0:
            workflow_status = "PENDING_MANAGER_APPROVAL"

        responses.append(InvoiceAnalyzeResponse(
            buyer_name=item.get("buyer_name"),
            seller_name=item.get("seller_name"),
            invoice_number=ledger_item.invoice_number,
            amount=ledger_item.total_amount,
            invoice_date=item.get("invoice_date", "YYYY-MM-DD"),
            invoice_type=ledger_item.invoice_type,
            risk_warning=risk_warning,
            workflow_status=workflow_status,
            compliance_score=compliance_score
        ))

    return responses
