from fastapi import Request, Response, HTTPException
from sqlalchemy.orm import Session
from models.user import User
from passlib.context import CryptContext
from datetime import timedelta

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def verify_credentials(email: str, password: str, role: str, db: Session):
    user = db.query(User).filter(User.email == email).first()
    if not user:
        return None

    # Match role to flags
    if role == "admin" and not user.is_admin:
        return None
    if role == "professional" and not user.is_authorized:
        return None
    if role == "user" and (user.is_admin or user.is_authorized):
        return None

    if pwd_context.verify(password, user.hashed_password):
        return user
    return None

def create_session(response: Response, user: User):
    response.set_cookie(
        key="session_id",
        value=str(user.id),
        httponly=True,
        max_age=int(timedelta(days=1).total_seconds()),
        samesite="Lax"
    )

def get_current_user(request: Request, db: Session):
    session_id = request.cookies.get("session_id")
    if session_id:
        return db.query(User).filter(User.id == session_id).first()
    return None

def require_auth(request: Request, db: Session):
    user = get_current_user(request, db)
    if not user:
        raise HTTPException(status_code=401, detail="Not authenticated")
    return user

def require_admin(request: Request, db: Session):
    user = require_auth(request, db)
    if not user.is_admin:
        raise HTTPException(status_code=403, detail="Admin access required")
    return user

def require_authorized(request: Request, db: Session):
    user = require_auth(request, db)
    if not user.is_authorized:
        raise HTTPException(status_code=403, detail="Authorization required")
    return user
