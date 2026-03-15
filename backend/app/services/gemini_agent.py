import google.generativeai as genai
from app.core.config import settings
import re

genai.configure(api_key=settings.GOOGLE_API_KEY)

def analyze_invoice_vision(image_url: str, prompt: str = "你是一个资深审计专家。请分步骤操作：1. 识别发票中所有文字；2. 提取金额、税号等关键字段；3. 检查是否有重复报销或虚假发票的特征，并给出具体的AI合规评分（compliance_score，1-100分，比如重复报销、连号等高风险应低于60分，轻微瑕疵或政策变动提醒60-89分，正常发票90-100分）。最终仅输出严格的 JSON。字段必须为：购买方名称(buyer_name)、销售方名称(seller_name)、发票号码(invoice_number)、开票日期(invoice_date)、总金额(total_amount，纯数字)、发票类型(invoice_type)、风险预警(risk_warning，无风险为空)、合规建议(compliance_suggestions)、AI评分(compliance_score，纯数字)。") -> str:
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
