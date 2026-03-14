from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from typing import List
from app.core.database import get_db
from app.models.schemas import LedgerEntryResponse
from app.models.domain import LedgerItem

router = APIRouter()

@router.get("/", response_model=List[LedgerEntryResponse])
def get_ledger_entries(db: Session = Depends(get_db)):
    """
    获取账簿所有明细记录
    """
    items = db.query(LedgerItem).order_by(LedgerItem.id.desc()).all()
    return items
