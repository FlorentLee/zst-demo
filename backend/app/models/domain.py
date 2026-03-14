from sqlalchemy import Column, Integer, String, Float, DateTime
from datetime import datetime
from app.core.database import Base

class LedgerItem(Base):
    __tablename__ = "ledger_items"
    
    id = Column(Integer, primary_key=True, index=True)
    invoice_number = Column(String, index=True)
    total_amount = Column(Float)
    invoice_type = Column(String)
    created_at = Column(DateTime, default=datetime.utcnow)
    compliance_score = Column(Float, default=100.0)
    risk_warning = Column(String, nullable=True)
