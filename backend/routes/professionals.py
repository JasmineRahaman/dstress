from fastapi import APIRouter, Depends, Request, HTTPException
from sqlalchemy.orm import Session
from database import get_db
from models.professional import Professional
from models.booking import Booking
from models.user import User
from utils.auth import require_auth
from pydantic import BaseModel
from datetime import date, time

router = APIRouter(prefix="/professionals", tags=["professionals"])

class BookingCreate(BaseModel):
    date: date
    time: time
    notes: str = ""

@router.get("")
async def get_professionals(db: Session = Depends(get_db)):
    professionals = db.query(Professional).all()
    return [{
        "id": p.id,
        "name": p.name,
        "contact":p.contact,
        "email":p.email,
        "specialization": p.specialization,
        "bio": p.bio,
        "rate": p.rate
    } for p in professionals]

@router.post("/{professional_id}/book")
async def book_session(
    professional_id: int,
    booking_data: BookingCreate,
    request: Request,
    db: Session = Depends(get_db)
):
    user = require_auth(request, db)
    
    professional = db.query(Professional).filter(Professional.id == professional_id).first()
    if not professional:
        raise HTTPException(status_code=404, detail="Professional not found")
    
    booking = Booking(
        user_id=user.id,
        professional_id=professional_id,
        date=booking_data.date,
        time=booking_data.time,
        notes=booking_data.notes
    )
    
    db.add(booking)
    db.commit()
    db.refresh(booking)
    
    return {"id": booking.id, "status": "success"}
