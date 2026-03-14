import os
from openai import OpenAI
from app.core.config import settings

# 强制约束模型名称
MODEL_NAME = "doubao-seed-2-0-pro-260215"

# 严格使用 OpenAI SDK 初始化火山方舟接口
client = OpenAI(
    base_url="https://ark.cn-beijing.volces.com/api/v3",
    api_key=settings.ARK_API_KEY,
)

def analyze_invoice_vision(image_url: str, prompt: str = "请提取发票中的关键信息：购买方名称(buyer_name)、销售方名称(seller_name)、发票号码(invoice_number)、总金额(total_amount)、发票类型(invoice_type，如餐饮费、交通费等)。必须以严格的JSON格式返回，所有键名使用上述括号内的英文，并且total_amount总金额必须是纯数字浮点数（不要带'元'等符号）。") -> str:
    """
    使用豆包多模态模型进行发票 OCR 解析
    """
    messages = [
        {
            "role": "user",
            "content": [
                {"type": "text", "text": prompt},
                {
                    "type": "image_url",
                    "image_url": {"url": image_url}
                }
            ]
        }
    ]
    response = client.chat.completions.create(
        model=MODEL_NAME,
        messages=messages,
    )
    return response.choices[0].message.content

def generate_ceo_report(prompt: str) -> str:
    """
    使用豆包文本模型生成老板经营简报
    """
    messages = [
        {"role": "system", "content": "你是一位资深财务总监，负责为公司老板生成专业的经营简报。"},
        {"role": "user", "content": prompt}
    ]
    response = client.chat.completions.create(
        model=MODEL_NAME,
        messages=messages,
    )
    return response.choices[0].message.content
