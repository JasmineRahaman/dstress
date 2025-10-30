from sqlalchemy import Column, Integer, String, DateTime, ForeignKey, Date, Time
from datetime import datetime
from database import Base

class Booking(Base):
    __tablename__ = "bookings"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    professional_id = Column(Integer, ForeignKey("professionals.id"), nullable=False)
    date = Column(Date, nullable=False)
    time = Column(Time, nullable=False)
    notes = Column(String, nullable=True)
    status = Column(String, default="pending")
    created_at = Column(DateTime, default=datetime.utcnow)
