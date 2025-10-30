from sqlalchemy import Column, Integer, String, JSON, DateTime, ForeignKey
from datetime import datetime
from database import Base

class Assessment(Base):
    __tablename__ = "assessments"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=True)
    answers = Column(JSON, nullable=False)
    total_score = Column(Integer, nullable=False)
    category_scores = Column(JSON, nullable=False)
    stress_level = Column(String, nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)
