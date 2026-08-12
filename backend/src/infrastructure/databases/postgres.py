# PostgreSQL database connection management via SQLAlchemy
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from config import DevelopmentConfig
from infrastructure.databases.base import Base

DATABASE_URI = DevelopmentConfig.DATABASE_URI
engine = create_engine(DATABASE_URI)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
session = SessionLocal()

def init_postgres(app):
    Base.metadata.create_all(bind=engine)