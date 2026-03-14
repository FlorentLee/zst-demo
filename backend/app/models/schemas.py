from pydantic import BaseModel
from typing import Optional, List

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

class LedgerEntryCreate(BaseModel):
    invoice_number: str
    total_amount: float
    invoice_type: str

class LedgerEntryResponse(LedgerEntryCreate):
    id: int
    
    class Config:
        from_attributes = True

class CEOReportResponse(BaseModel):
    report: str
