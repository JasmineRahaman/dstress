from fastapi import APIRouter, Depends, Response, HTTPException, Request
from sqlalchemy.orm import Session
from pydantic import BaseModel,EmailStr
from database import get_db
from models.user import User
from utils.auth import verify_credentials, create_session, get_current_user,pwd_context

router = APIRouter(prefix="/auth", tags=["auth"])

class LoginRequest(BaseModel):
    role: str  # "user", "professional", or "admin"
    email: str
    password: str

class RegisterRequest(BaseModel):
    name: str
    age: int
    email: EmailStr
    password: str
    role: str  # "user", "professional", or "admin"

@router.post("/login")
def login(data: LoginRequest, response: Response, db: Session = Depends(get_db)):
    user = verify_credentials(data.email, data.password, data.role, db)
    if not user:
        raise HTTPException(status_code=401, detail="Invalid credentials")
    create_session(response, user)
    return {"message": "Login successful", "user": {"id": user.id, "name": user.name, "email": user.email}}

@router.post("/logout")
def logout(response: Response):
    response.delete_cookie("session_id")
    return {"message": "Logged out"}

@router.post("/register")
def register(data: RegisterRequest, db: Session = Depends(get_db)):
    existing = db.query(User).filter_by(email=data.email).first()
    if existing:
        raise HTTPException(status_code=400, detail="Email already registered")

    hashed_password = pwd_context.hash(data.password)

    user = User(
        name=data.name,
        age=data.age,
        email=data.email,
        hashed_password=hashed_password,
        is_admin=(data.role == "admin"),
        is_authorized=(data.role == "professional")
    )

    db.add(user)
    db.commit()
    db.refresh(user)

    return {"message": "Registration successful", "user": {"id": user.id, "email": user.email}}

@router.get("/user")
def get_user(request: Request, db: Session = Depends(get_db)):
    user = get_current_user(request, db)
    if not user:
        raise HTTPException(status_code=401, detail="Not authenticated")
    return {
        "id": user.id,
        "name": user.name,
        "email": user.email,
        "is_admin": user.is_admin,
        "is_authorized": user.is_authorized
    }
