from sqlalchemy import Column, Integer, String, Boolean, DateTime
from sqlalchemy.orm import relationship
from datetime import datetime, timezone
from database import Base

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    age = Column(Integer, nullable=False)
    email = Column(String, unique=True, index=True, nullable=False)
    hashed_password = Column(String(100), nullable=False)
    is_authorized = Column(Boolean, default=False)
    is_admin = Column(Boolean, default=False)
    created_at = Column(DateTime, default=lambda: datetime.now(timezone.utc))

    bookings = relationship(
        "Booking",
        back_populates="user",
        cascade="all, delete-orphan",
        passive_deletes=True
    )
