from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
import os
import sys

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

from database import engine, Base
from routes import (
    auth,
    questionnaire,
    activities,
    professionals,
    bookings,
    community,
    todos,
    admin
)

Base.metadata.create_all(bind=engine)

app = FastAPI(title="D-Stress API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

os.makedirs("uploads", exist_ok=True)
app.mount("/uploads", StaticFiles(directory="uploads"), name="uploads")

app.include_router(auth.router, prefix="/api")
app.include_router(questionnaire.router, prefix="/api")
app.include_router(activities.router, prefix="/api")
app.include_router(professionals.router, prefix="/api")
app.include_router(bookings.router, prefix="/api")
app.include_router(community.router, prefix="/api")
app.include_router(todos.router, prefix="/api")
app.include_router(admin.router, prefix="/api")

@app.get("/api/health")
async def health_check():
    return {"status": "healthy"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
