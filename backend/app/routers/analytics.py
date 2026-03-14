from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.models.domain import LedgerItem
from app.models.schemas import CEOReportResponse
from app.services.gemini_agent import generate_ceo_report

router = APIRouter()

@router.get("/ceo-report", response_model=CEOReportResponse)
def get_ceo_report(db: Session = Depends(get_db)):
    """
    一键生成AI老板报告
    """
    items = db.query(LedgerItem).all()
    total_expense = sum(item.total_amount for item in items if item.total_amount)
    total_revenue = total_expense * 1.5 # Demo mock data for revenue
    
    prompt = f"基于本月收入{total_revenue}元，支出{total_expense}元，本月系统共处理合规单据{len(items)}张，请用资深财务总监的口吻写一段200字的经营简报，重点关注支出健康度。"
    report_content = generate_ceo_report(prompt)
    
    return CEOReportResponse(report=report_content)

@router.get("/mock-ceo-report", response_model=CEOReportResponse)
def get_mock_ceo_report():
    """
    获取模拟的AI老板经营周报，无需调用真实的LLM API
    """
    import datetime
    today = datetime.date.today().strftime("%Y-%m-%d")
    mock_report = f"""老板，这是截至 {today} 的经营周报：

1. **整体营收健康**：本周主营业务收入表现稳定，尤其是服务与咨询板块增长显著，反映出客户粘性的提升。
2. **支出控制良好**：各项费用支出均在预算范围内，本周系统自动复核拦截了2张不合规单据，有效规避了税务风险。
3. **税务健康度提示**：虽然当前企业税务复核健康率略低于行业均值，但随着智能工作流的深入应用，预计Q4将有明显改善。

建议下周继续关注服务板块的利润转化，并加快新一期软件授权合同的签署。"""
    
    return CEOReportResponse(report=mock_report)
