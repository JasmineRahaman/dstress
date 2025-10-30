from sqlalchemy import Column, Integer, String, Text, DateTime, ForeignKey, Date, Time
from datetime import datetime
from database import Base

class Post(Base):
    __tablename__ = "posts"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    type = Column(String, nullable=False)
    image_url = Column(String, nullable=True)
    name = Column(String, nullable=True)
    place = Column(String, nullable=True)
    date = Column(Date, nullable=True)
    time = Column(Time, nullable=True)
    organizer_name = Column(String, nullable=True)
    organizer_contact = Column(String, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)

class Comment(Base):
    __tablename__ = "comments"

    id = Column(Integer, primary_key=True, index=True)
    post_id = Column(Integer, ForeignKey("posts.id"), nullable=False)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    content = Column(Text, nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)
