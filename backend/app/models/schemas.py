from pydantic import BaseModel
from typing import Optional, List
from datetime import datetime

class InvoiceAnalyzeRequest(BaseModel):
    image_url: str

class InvoiceAnalyzeResponse(BaseModel):
    buyer_name: Optional[str] = None
    seller_name: Optional[str] = None
    invoice_number: Optional[str] = None
    amount: Optional[float] = None
    invoice_date: Optional[str] = None
    invoice_type: Optional[str] = None
    risk_warning: Optional[str] = None
    workflow_status: Optional[str] = None
    compliance_score: Optional[float] = None

class LedgerEntryCreate(BaseModel):
    invoice_number: str
    total_amount: float
    invoice_type: str

class LedgerEntryUpdate(BaseModel):
    invoice_number: Optional[str] = None
    total_amount: Optional[float] = None
    invoice_type: Optional[str] = None
    compliance_score: Optional[float] = None
    risk_warning: Optional[str] = None

class LedgerEntryResponse(LedgerEntryCreate):
    id: int
    created_at: Optional[datetime] = None
    compliance_score: Optional[float] = None
    risk_warning: Optional[str] = None
    
    class Config:
        from_attributes = True

class CEOReportResponse(BaseModel):
    report: str
