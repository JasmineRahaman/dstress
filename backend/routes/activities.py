from fastapi import APIRouter, Query

router = APIRouter(prefix="/activities", tags=["activities"])

@router.get("")
async def get_activities(score: int = Query(default=0)):
    activities = [
        {"name": "Listening to Music", "category": "creative", "stressLevel": "low"},
        {"name": "Painting or Drawing", "category": "creative", "stressLevel": "moderate"},
        {"name": "Cooking", "category": "creative", "stressLevel": "moderate"},
        {"name": "Dancing", "category": "physical", "stressLevel": "moderate"},
        {"name": "Hiking", "category": "physical", "stressLevel": "high"},
        {"name": "Walking", "category": "physical", "stressLevel": "low"},
        {"name": "Yoga", "category": "physical", "stressLevel": "moderate"},
        {"name": "Meditation", "category": "mindful", "stressLevel": "all"},
        {"name": "Journaling", "category": "mindful", "stressLevel": "moderate"},
        {"name": "Reading", "category": "relaxation", "stressLevel": "low"},
        {"name": "Gardening", "category": "physical", "stressLevel": "moderate"},
        {"name": "Swimming", "category": "physical", "stressLevel": "moderate"},
    ]
    
    return activities
