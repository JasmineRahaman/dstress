from sqlalchemy import Column, Integer, String, DateTime, ForeignKey, Date, Time, Float
from datetime import datetime, timezone
from database import Base

class Booking(Base):
    __tablename__ = "bookings"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    professional_id = Column(Integer, ForeignKey("professionals.id"), nullable=False)
    date = Column(Date, nullable=False)
    time = Column(Time, nullable=False)
    notes = Column(String, nullable=True)
    amount_paid=Column(Float, nullable=True)
    balance_amount=Column(Float,nullable=True)
    status = Column(String, default="pending")
    created_at = Column(DateTime, default=lambda: datetime.now(timezone.utc))
