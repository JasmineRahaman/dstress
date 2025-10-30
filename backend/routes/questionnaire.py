from fastapi import APIRouter, Depends, Request
from sqlalchemy.orm import Session
from database import get_db
from models.assessment import Assessment
from utils.auth import get_current_user
from pydantic import BaseModel
from typing import Dict

router = APIRouter(prefix="/questionnaire", tags=["questionnaire"])

class QuestionnaireSubmission(BaseModel):
    answers: Dict[str, int]

def calculate_stress_score(answers: Dict[str, int]):
    question_categories = {
        '1': 'work', '2': 'work', '3': 'work',
        '4': 'relationship', '5': 'relationship', '6': 'relationship',
        '7': 'financial', '8': 'financial', '9': 'financial',
        '10': 'health', '11': 'health', '12': 'health'
    }
    
    category_scores = {'work': 0, 'relationship': 0, 'financial': 0, 'health': 0}
    total_score = 0
    
    for question_id, score in answers.items():
        category = question_categories.get(str(question_id))
        if category:
            category_scores[category] += score
            total_score += score
    
    if total_score <= 20:
        stress_level = "low"
    elif total_score <= 35:
        stress_level = "moderate"
    elif total_score <= 50:
        stress_level = "high"
    else:
        stress_level = "severe"
    
    recommendations = []
    
    if stress_level in ["low", "moderate"]:
        recommendations.extend([
            "Listening to Music",
            "Walking",
            "Reading",
            "Meditation"
        ])
    
    if stress_level in ["moderate", "high"]:
        recommendations.extend([
            "Painting or Drawing",
            "Cooking",
            "Yoga",
            "Journaling"
        ])
    
    if stress_level in ["high", "severe"]:
        recommendations.extend([
            "Dancing",
            "Hiking",
            "Swimming",
            "Consider booking a professional consultation"
        ])
    
    max_category = max(category_scores, key=category_scores.get)
    if max_category == "work":
        recommendations.append("Work-life balance activities")
    elif max_category == "relationship":
        recommendations.append("Social connection activities")
    elif max_category == "financial":
        recommendations.append("Mindfulness and grounding exercises")
    
    return {
        "total_score": total_score,
        "category_scores": category_scores,
        "stress_level": stress_level,
        "recommendations": list(set(recommendations))[:8]
    }

@router.post("/submit")
async def submit_questionnaire(
    submission: QuestionnaireSubmission,
    request: Request,
    db: Session = Depends(get_db)
):
    result = calculate_stress_score(submission.answers)
    
    user = get_current_user(request, db)
    user_id = user.id if user else None
    
    assessment = Assessment(
        user_id=user_id,
        answers=submission.answers,
        total_score=result["total_score"],
        category_scores=result["category_scores"],
        stress_level=result["stress_level"]
    )
    
    db.add(assessment)
    db.commit()
    
    return result
