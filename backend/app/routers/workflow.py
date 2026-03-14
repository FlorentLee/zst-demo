from fastapi import APIRouter

router = APIRouter(prefix="/api/workflow", tags=["workflow"])

@router.get("/config")
async def get_workflow_config():
    """
    返回模拟的工作流配置
    """
    return {
        "amount_threshold": 5000.0,
        "auto_audit_rules": [
            "发票真伪验证",
            "费用类型合规性",
            "重复报销检查"
        ],
        "approvers": ["主管审批", "财务核准"]
    }
