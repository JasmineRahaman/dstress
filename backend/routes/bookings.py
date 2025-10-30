from fastapi import APIRouter, Depends, Request
from sqlalchemy.orm import Session
from database import get_db
from models.booking import Booking
from models.professional import Professional
from utils.auth import require_auth

router = APIRouter(prefix="/bookings", tags=["bookings"])

@router.get("/my")
async def get_my_bookings(request: Request, db: Session = Depends(get_db)):
    user = require_auth(request, db)
    
    bookings = db.query(Booking).filter(Booking.user_id == user.id).all()
    
    result = []
    for booking in bookings:
        professional = db.query(Professional).filter(Professional.id == booking.professional_id).first()
        result.append({
            "id": booking.id,
            "professional_name": professional.name if professional else "Unknown",
            "date": booking.date.isoformat(),
            "time": booking.time.isoformat(),
            "notes": booking.notes,
            "status": booking.status
        })
    
    return result
