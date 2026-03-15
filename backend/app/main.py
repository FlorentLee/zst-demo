from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import os

from app.routers import invoice, ledger, analytics, workflow
from app.core.database import Base, engine
from app.services.rag_engine import init_rag_knowledge
from app.core.seeder import seed_initial_data
from app.core.database import SessionLocal

# 创建SQLite数据库表
Base.metadata.create_all(bind=engine)

app = FastAPI(title="Zhi Shui Tong API", version="1.0.0-beta")

@app.on_event("startup")
def log_routes():
    import logging
    logging.basicConfig(level=logging.INFO)
    logger = logging.getLogger(__name__)
    for route in app.routes:
        logger.info(f"Registered route: {getattr(route, 'methods', None)} {route.path}")

# CORS中间件：允许前端跨域访问
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # 生产环境应严格配置
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)

# 挂载路由模块
app.include_router(invoice.router, prefix="/invoice", tags=["Invoice"])
app.include_router(ledger.router, prefix="/ledger", tags=["Ledger"])
app.include_router(analytics.router, prefix="/analytics", tags=["Analytics"])
app.include_router(workflow.router, prefix="/workflow", tags=["Workflow"])

@app.on_event("startup")
def startup_event():
    """启动时初始化RAG知识库进 ChromaDB，并填充初始数据"""
    init_rag_knowledge()
    db = SessionLocal()
    try:
        seed_initial_data(db)
    finally:
        db.close()

@app.get("/")
def read_root():
    return {"status": "ZhiShuiTong API is running"}

if __name__ == "__main__":
    import uvicorn
    port = int(os.environ.get("PORT", 8000))
    uvicorn.run("app.main:app", host="0.0.0.0", port=port, reload=False)
