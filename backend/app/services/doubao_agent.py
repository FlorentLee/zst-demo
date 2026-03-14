import os
from openai import OpenAI
from app.core.config import settings

# 强制约束模型名称
MODEL_NAME = "ep-20260314211432-x6kz5"

# 严格使用 OpenAI SDK 初始化火山方舟接口
client = OpenAI(
    base_url="https://ark.cn-beijing.volces.com/api/v3",
    api_key=settings.ARK_API_KEY,
    timeout=120.0,
)

def analyze_invoice_vision(image_url: str, prompt: str = "你是一个资深审计专家。请分步骤操作：1. 识别发票中所有文字；2. 提取金额、税号等关键字段；3. 结合 RAG 检索到的政策进行风险判定。最终仅输出严格的 JSON。字段必须为：购买方名称(buyer_name)、销售方名称(seller_name)、发票号码(invoice_number)、总金额(total_amount，必须是纯数字浮点数，不要带元)、发票类型(invoice_type)。") -> str:
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
