from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.models.domain import LedgerItem
from app.models.schemas import CEOReportResponse
from app.services.doubao_agent import generate_ceo_report

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
