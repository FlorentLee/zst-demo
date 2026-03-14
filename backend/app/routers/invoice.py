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

router = APIRouter()

@router.post("/analyze", response_model=InvoiceAnalyzeResponse)
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
        
        # 进一步使用正则提取最外层的 {}
        match = re.search(r'\{.*\}', cleaned_response, re.DOTALL)
        if match:
            cleaned_response = match.group(0)
            
        parsed_data = json.loads(cleaned_response)
    except Exception as e:
        print(f"========== AI JSON 解析失败 ==========")
        print(f"Original AI response:\n{raw_response}")
        print(f"Cleaned response:\n{cleaned_response if 'cleaned_response' in locals() else 'N/A'}")
        print(f"Error details: {e}")
        print(f"=====================================")
        raise HTTPException(status_code=500, detail=f"Failed to parse OCR response as JSON. See logs for details.")
    
    # 2. RAG合规政策风险查询
    risk_warning = None
    invoice_type = parsed_data.get("invoice_type")
    if invoice_type:
        policy_text = search_policy(invoice_type)
        if policy_text:
           risk_warning = f"政策提醒: {policy_text[:100]}..."
    
    # 提取总金额并做安全转换
    raw_amount = parsed_data.get("total_amount", 0.0)
    if raw_amount is None:
        raw_amount = 0.0
    try:
        total_amount = float(raw_amount)
    except (ValueError, TypeError):
        # 如果包含"元"等非数字字符，使用正则提取
        num_match = re.search(r'[\d\.]+', str(raw_amount))
        total_amount = float(num_match.group(0)) if num_match else 0.0

    # 3. 自动存入账簿
    ledger_item = LedgerItem(
        invoice_number=str(parsed_data.get("invoice_number", "UNKNOWN")),
        total_amount=total_amount,
        invoice_type=invoice_type or "UNKNOWN"
    )
    db.add(ledger_item)
    db.commit()
    db.refresh(ledger_item)

    # 4. 审批流判定逻辑
    workflow_status = "AUTO_BOOKED"
    if ledger_item.total_amount > 5000.0:
        workflow_status = "PENDING_MANAGER_APPROVAL"

    return InvoiceAnalyzeResponse(
        buyer_name=parsed_data.get("buyer_name"),
        seller_name=parsed_data.get("seller_name"),
        invoice_number=ledger_item.invoice_number,
        total_amount=ledger_item.total_amount,
        invoice_type=ledger_item.invoice_type,
        risk_warning=risk_warning,
        workflow_status=workflow_status
    )
