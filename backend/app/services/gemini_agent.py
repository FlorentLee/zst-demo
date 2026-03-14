import google.generativeai as genai
from app.core.config import settings
import re

genai.configure(api_key=settings.GOOGLE_API_KEY)

def analyze_invoice_vision(image_url: str, prompt: str = "你是一个资深审计专家。请分步骤操作：1. 识别发票中所有文字；2. 提取金额、税号等关键字段；3. 结合 RAG 检索到的政策进行风险判定。最终仅输出严格的 JSON。字段必须为：购买方名称(buyer_name)、销售方名称(seller_name)、发票号码(invoice_number)、开票日期(invoice_date, 格式YYYY-MM-DD)、总金额(total_amount，必须是纯数字浮点数，不要带元)、发票类型(invoice_type)、风险预警(risk_warning，如果无风险则为空)、合规建议(compliance_suggestions)。") -> str:
    """
    使用多模态模型进行发票OCR解析
    """
    model = genai.GenerativeModel('models/gemini-3-flash-preview')
    
    # Extract mime_type and base64 data from data URL
    match = re.match(r"data:(?P<mime_type>.*?);base64,(?P<data>.*)", image_url)
    if not match:
        raise ValueError("Invalid data URL format")
    
    mime_type = match.group("mime_type")
    base64_data = match.group("data")
    
    image_part = {
        "inline_data": {
            "mime_type": mime_type,
            "data": base64_data,
        }
    }
    
    response = model.generate_content([prompt, image_part])
    return response.text

def generate_ceo_report(prompt: str) -> str:
    """
    使用文本模型生成老板经营简报
    """
    model = genai.GenerativeModel('models/gemini-3-flash-preview')
    response = model.generate_content(prompt)
    return response.text
