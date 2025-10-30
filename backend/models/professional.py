from sqlalchemy import Column, Integer, String, Text, Float, DateTime
from datetime import datetime
from database import Base

class Professional(Base):
    __tablename__ = "professionals"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    specialization = Column(String, nullable=False)
    bio = Column(Text, nullable=False)
    rate = Column(Float, nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)
