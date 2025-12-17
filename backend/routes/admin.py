from fastapi import APIRouter, Depends, Request, HTTPException
from sqlalchemy.orm import Session
from database import get_db
from models.user import User
from models.professional import Professional
from utils.auth import require_admin
from pydantic import BaseModel

router = APIRouter(prefix="/admin", tags=["admin"])

class ProfessionalCreate(BaseModel):
    name: str
    contact: str
    email: str
    specialization: str
    bio: str
    rate: float

@router.get("/users")
async def get_users(request: Request, db: Session = Depends(get_db)):
    require_admin(request, db)
    users = db.query(User).all()
    
    return [{
        "id": u.id,
        "name": u.name,
        "email": u.email,
        "is_authorized": u.is_authorized,
        "is_admin": u.is_admin,
        "created_at": u.created_at.isoformat() if u.created_at else None
    } for u in users]

@router.post("/users/{user_id}/authorize")
async def authorize_user(
    user_id: int,
    request: Request,
    db: Session = Depends(get_db)
):
    require_admin(request, db)
    
    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    
    user.is_authorized = True
    db.commit()
    
    return {"status": "success"}

@router.delete("/users/{user_id}/delete")                     #delete User
async def delete_user(
    user_id: int,
    request: Request,
    db: Session = Depends(get_db)
):
    require_admin(request, db)
    
    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    
    db.delete(user)
    db.commit()
    
    return {"status": "success"}


@router.get("/professionals")
async def get_professionals(request: Request, db: Session = Depends(get_db)):
    require_admin(request, db)
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

@router.post("/professionals")
async def create_professional(
    pro_data: ProfessionalCreate,
    request: Request,
    db: Session = Depends(get_db)
):
    require_admin(request, db)
    
    professional = Professional(
        name=pro_data.name,
        specialization=pro_data.specialization,
        contact=pro_data.contact,
        email=pro_data.email,
        bio=pro_data.bio,
        rate=pro_data.rate
    )
    
    db.add(professional)
    db.commit()
    db.refresh(professional)
    
    return {"id": professional.id, "status": "success"}

@router.put("/professionals/{professional_id}")
async def update_professional(
    professional_id: int,
    pro_data: ProfessionalCreate,
    request: Request,
    db: Session = Depends(get_db)
):
    require_admin(request, db)
    
    professional = db.query(Professional).filter(Professional.id == professional_id).first()
    if not professional:
        raise HTTPException(status_code=404, detail="Professional not found")
    
    professional.name = pro_data.name
    professional.contact=pro_data.contact
    professional.email=pro_data.email
    professional.specialization = pro_data.specialization
    professional.bio = pro_data.bio
    professional.rate = pro_data.rate
    
    db.commit()
    
    return {"status": "success"}


@router.delete("/professionals/{professional_id}")
async def delete_professional(
    professional_id: int,
    request: Request,
    db: Session = Depends(get_db)
):
    require_admin(request, db)
    
    professional = db.query(Professional).filter(Professional.id == professional_id).first()
    if not professional:
        raise HTTPException(status_code=404, detail="Professional not found")
    
    db.delete(professional)
    db.commit()
    
    return {"status": "success"}
