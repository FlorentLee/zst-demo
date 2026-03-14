from sqlalchemy import Column, Integer, String, Float
from app.core.database import Base

class LedgerItem(Base):
    __tablename__ = "ledger_items"
    
    id = Column(Integer, primary_key=True, index=True)
    invoice_number = Column(String, index=True)
    total_amount = Column(Float)
    invoice_type = Column(String)
