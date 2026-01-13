import os

class Config:
    SECRET_KEY = os.getenv("SECRET_KEY", "dev-secret-key")
    ENV = os.getenv("FLASK_ENV", "development")
    JWT_SECRET_KEY = os.getenv("JWT_SECRET_KEY", "dev-jwt-secret")

    SQLALCHEMY_DATABASE_URI = os.getenv("DATABASE_URL", "sqlite:///vionix.db")
    SQLALCHEMY_TRACK_MODIFICATIONS = False
     
    PUBLIC_BASE_URL = os.getenv("PUBLIC_BASE_URL", "").rstrip("/")
    CORS_ORIGINS = os.getenv("CORS_ORIGINS", "")
    
    COMFY_URL = os.getenv("COMFY_URL", "http://127.0.0.1:8188")
    GENIX_OUTPUT_DIR = os.getenv("GENIX_OUTPUT_DIR", "app/static/genix")
    GENIX_OUTPUT_URL_PREFIX = os.getenv("GENIX_OUTPUT_URL_PREFIX", "/static/genix")
    
