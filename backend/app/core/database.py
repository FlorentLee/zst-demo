import os
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base
import chromadb
from app.core.config import settings

# --- SQLite Setup ---
# Ensure data directory exists
os.makedirs(os.path.dirname(settings.DATABASE_URL.replace("sqlite:///", "")), exist_ok=True)

engine = create_engine(
    settings.DATABASE_URL, connect_args={"check_same_thread": False}
)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()

# DB Dependency for FastAPI
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# --- ChromaDB Setup ---
os.makedirs(settings.CHROMA_DB_DIR, exist_ok=True)
chroma_client = chromadb.PersistentClient(path=settings.CHROMA_DB_DIR)

def get_chroma_client():
    return chroma_client
