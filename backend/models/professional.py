from sqlalchemy import Column, Integer, String, Text, Float, DateTime
from datetime import datetime, timezone
from database import Base

class Professional(Base):
    __tablename__ = "professionals"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    contact = Column(String,nullable=False)
    email = Column(String, unique=True, index=True, nullable=False)
    specialization = Column(String, nullable=False)
    bio = Column(Text, nullable=False)
    rate = Column(Float, nullable=False)
    created_at = Column(DateTime, default=lambda: datetime.now(timezone.utc))
