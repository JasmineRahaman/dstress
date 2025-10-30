from fastapi import Request, HTTPException
from sqlalchemy.orm import Session
from models.user import User

def get_current_user(request: Request, db: Session):
    replit_user = request.headers.get("X-Replit-User-Id")
    replit_name = request.headers.get("X-Replit-User-Name")
    replit_email = request.headers.get("X-Replit-User-Email")
    
    if not replit_user:
        return None
    
    user = db.query(User).filter(User.replit_id == replit_user).first()
    
    if not user:
        user = User(
            replit_id=replit_user,
            name=replit_name or "User",
            email=replit_email or f"{replit_user}@replit.local"
        )
        db.add(user)
        db.commit()
        db.refresh(user)
    
    return user

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
