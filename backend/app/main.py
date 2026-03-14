from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import os

from app.routers import invoice, ledger, analytics, workflow
from app.core.database import Base, engine
from app.services.rag_engine import init_rag_knowledge

# 创建SQLite数据库表
Base.metadata.create_all(bind=engine)

app = FastAPI(title="Zhi Shui Tong API", version="1.0.0-beta")

# CORS中间件：允许前端跨域访问
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # 生产环境应严格配置
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)

# 挂载路由模块
app.include_router(invoice.router, prefix="/api/invoice", tags=["Invoice"])
app.include_router(ledger.router, prefix="/api/ledger", tags=["Ledger"])
app.include_router(analytics.router, prefix="/api/analytics", tags=["Analytics"])
app.include_router(workflow.router, prefix="/api/workflow", tags=["Workflow"])

@app.on_event("startup")
def startup_event():
    """启动时初始化RAG知识库进 ChromaDB"""
    init_rag_knowledge()

@app.get("/")
def root():
    return {"status": "ok", "message": "Zhi Shui Tong Backend Beta powered by Doubao is running."}
