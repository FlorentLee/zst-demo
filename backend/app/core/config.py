import os
from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    PROJECT_NAME: str = "Zhi Shui Tong API"
    ARK_API_KEY: str = os.getenv("ARK_API_KEY", "")
    DATABASE_URL: str = "sqlite:///./data/zst_database.db"
    CHROMA_DB_DIR: str = "./data/chroma_db"
    
    class Config:
        env_file = ".env"

settings = Settings()
