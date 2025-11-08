from pydantic import BaseModel, EmailStr

class RegisterRequest(BaseModel):
    name: str
    age: int
    email: EmailStr
    password: str
    role: str  # "user", "professional", or "admin"
