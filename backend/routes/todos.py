from fastapi import APIRouter, Depends, Request, HTTPException
from sqlalchemy.orm import Session
from database import get_db
from models.todo import Todo
from utils.auth import require_auth
from pydantic import BaseModel

router = APIRouter(prefix="/todos", tags=["todos"])

class TodoCreate(BaseModel):
    title: str
    completed: bool = False

class TodoUpdate(BaseModel):
    title: str = None
    completed: bool = None

@router.get("")
async def get_todos(request: Request, db: Session = Depends(get_db)):
    user = require_auth(request, db)
    todos = db.query(Todo).filter(Todo.user_id == user.id).order_by(Todo.created_at.desc()).all()
    
    return [{
        "id": t.id,
        "title": t.title,
        "completed": t.completed,
        "created_at": t.created_at.isoformat()
    } for t in todos]

@router.post("")
async def create_todo(
    todo_data: TodoCreate,
    request: Request,
    db: Session = Depends(get_db)
):
    user = require_auth(request, db)
    
    todo = Todo(
        user_id=user.id,
        title=todo_data.title,
        completed=todo_data.completed
    )
    
    db.add(todo)
    db.commit()
    db.refresh(todo)
    
    return {"id": todo.id, "status": "success"}

@router.put("/{todo_id}")
async def update_todo(
    todo_id: int,
    todo_data: TodoUpdate,
    request: Request,
    db: Session = Depends(get_db)
):
    user = require_auth(request, db)
    
    todo = db.query(Todo).filter(Todo.id == todo_id, Todo.user_id == user.id).first()
    if not todo:
        raise HTTPException(status_code=404, detail="Todo not found")
    
    if todo_data.title is not None:
        todo.title = todo_data.title
    if todo_data.completed is not None:
        todo.completed = todo_data.completed
    
    db.commit()
    
    return {"id": todo.id, "status": "success"}

@router.delete("/{todo_id}")
async def delete_todo(
    todo_id: int,
    request: Request,
    db: Session = Depends(get_db)
):
    user = require_auth(request, db)
    
    todo = db.query(Todo).filter(Todo.id == todo_id, Todo.user_id == user.id).first()
    if not todo:
        raise HTTPException(status_code=404, detail="Todo not found")
    
    db.delete(todo)
    db.commit()
    
    return {"status": "success"}
