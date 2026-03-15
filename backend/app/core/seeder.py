from sqlalchemy.orm import Session
from app.models.domain import LedgerItem
from datetime import datetime

def seed_initial_data(db: Session):
    # 检查数据库是否已经有数据
    if db.query(LedgerItem).count() == 0:
        print("Database is empty. Seeding initial ledger data...")
        initial_items = [
            LedgerItem(
                invoice_number='0123456789',
                total_amount=84600.00,
                invoice_type='增值税专用发票 · 北京联通科技',
                created_at=datetime(2024, 12, 18),
                compliance_score=99.8,
                risk_warning=None
            ),
            LedgerItem(
                invoice_number='EXP-2024-2018',
                total_amount=3280.00,
                invoice_type='差旅费用报销单 · 张建国',
                created_at=datetime(2024, 12, 17),
                compliance_score=85,
                risk_warning='AI预警：餐饮费疑似超标，建议人工复核'
            ),
            LedgerItem(
                invoice_number='9876543210',
                total_amount=128000.00,
                invoice_type='增值税普通发票 · 上海云端科技',
                created_at=datetime(2024, 12, 16),
                compliance_score=100,
                risk_warning=None
            ),
            LedgerItem(
                invoice_number='1122334455',
                total_amount=42800.00,
                invoice_type='增值税专用发票 · 广州美林印刷',
                created_at=datetime(2024, 12, 15),
                compliance_score=75,
                risk_warning='风险拦截：与账簿数据不符，差异 ¥12,400'
            )
        ]
        db.add_all(initial_items)
        db.commit()
        print("Initial data seeded successfully.")
    else:
        print("Database already contains data. Skipping seeding.")
