from fastapi import APIRouter, Depends, Request, Response
from sqlalchemy.orm import Session
from database import get_db
from utils.auth import get_current_user

router = APIRouter(prefix="/auth", tags=["auth"])

@router.get("/login")
async def login():
    return {"message": "Use Replit Auth to login"}

@router.post("/logout")
async def logout(response: Response):
    return {"message": "Logged out"}

@router.get("/user")
async def get_user(request: Request, db: Session = Depends(get_db)):
    user = get_current_user(request, db)
    if not user:
        return None
    
    return {
        "id": user.id,
        "name": user.name,
        "email": user.email,
        "is_authorized": user.is_authorized,
        "is_admin": user.is_admin,
        "created_at": user.created_at.isoformat()
    }
