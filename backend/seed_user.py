from database import SessionLocal
from models.user import User
from utils.auth import pwd_context

db = SessionLocal()

# Check if user already exists
email = "test@example.com"
existing = db.query(User).filter_by(email="test@example.com").first()
if existing:
    print("User already exists.")
else:
    # proceed to insert
    user = User(
        name="Test Admin",
        age=30,
        email=email,
        hashed_password=pwd_context.hash("test123"),
        is_admin=True,
        is_authorized=True
    )
    try:
        db.add(user)
        db.commit()
        db.refresh(user)
        print("User created successfully.")
    except Exception as e:
        db.rollback()
        print("Error creating user:", e)

