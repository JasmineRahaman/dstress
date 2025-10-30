from fastapi import APIRouter, Depends, Request, HTTPException, UploadFile, File, Form
from sqlalchemy.orm import Session
from database import get_db
from models.post import Post, Comment
from models.user import User
from utils.auth import require_auth, require_authorized
from pydantic import BaseModel
import os
from datetime import date, time as dt_time

router = APIRouter(prefix="/community", tags=["community"])

class CommentCreate(BaseModel):
    content: str

@router.get("/posts")
async def get_posts(db: Session = Depends(get_db)):
    posts = db.query(Post).order_by(Post.created_at.desc()).all()
    
    result = []
    for post in posts:
        user = db.query(User).filter(User.id == post.user_id).first()
        comment_count = db.query(Comment).filter(Comment.post_id == post.id).count()
        
        post_data = {
            "id": post.id,
            "type": post.type,
            "author_name": user.name if user else "Unknown",
            "created_at": post.created_at.isoformat(),
            "comment_count": comment_count
        }
        
        if post.type == "image":
            post_data["image_url"] = post.image_url
        else:
            post_data.update({
                "name": post.name,
                "place": post.place,
                "date": post.date.isoformat() if post.date else None,
                "time": post.time.isoformat() if post.time else None,
                "organizer_name": post.organizer_name,
                "organizer_contact": post.organizer_contact
            })
        
        result.append(post_data)
    
    return result

@router.post("/posts")
async def create_post(
    request: Request,
    db: Session = Depends(get_db),
    type: str = Form(...),
    image: UploadFile = File(None),
    name: str = Form(None),
    place: str = Form(None),
    date: str = Form(None),
    time: str = Form(None),
    organizer_name: str = Form(None),
    organizer_contact: str = Form(None)
):
    user = require_authorized(request, db)
    
    post = Post(user_id=user.id, type=type)
    
    if type == "image" and image:
        os.makedirs("uploads", exist_ok=True)
        file_path = f"uploads/{image.filename}"
        with open(file_path, "wb") as f:
            f.write(await image.read())
        post.image_url = f"/{file_path}"
    else:
        post.name = name
        post.place = place
        if date:
            post.date = date
        if time:
            post.time = time
        post.organizer_name = organizer_name
        post.organizer_contact = organizer_contact
    
    db.add(post)
    db.commit()
    db.refresh(post)
    
    return {"id": post.id, "status": "success"}

@router.get("/posts/{post_id}/comments")
async def get_comments(post_id: int, db: Session = Depends(get_db)):
    comments = db.query(Comment).filter(Comment.post_id == post_id).order_by(Comment.created_at.desc()).limit(20).all()
    
    result = []
    for comment in comments:
        user = db.query(User).filter(User.id == comment.user_id).first()
        result.append({
            "id": comment.id,
            "content": comment.content,
            "author_name": user.name if user else "Unknown",
            "created_at": comment.created_at.isoformat()
        })
    
    return result

@router.post("/posts/{post_id}/comments")
async def add_comment(
    post_id: int,
    comment_data: CommentCreate,
    request: Request,
    db: Session = Depends(get_db)
):
    user = require_auth(request, db)
    
    post = db.query(Post).filter(Post.id == post_id).first()
    if not post:
        raise HTTPException(status_code=404, detail="Post not found")
    
    comment = Comment(
        post_id=post_id,
        user_id=user.id,
        content=comment_data.content
    )
    
    db.add(comment)
    db.commit()
    db.refresh(comment)
    
    return {"id": comment.id, "status": "success"}
