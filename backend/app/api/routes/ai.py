from fastapi import APIRouter, HTTPException

from app.schemas.ai_request import AIInsightRequest
from app.services.ai_service import AIService

router = APIRouter(
    prefix="/ai-insight",
    tags=["AI Insights"]
)

ai_service = AIService()


@router.post("/")
def generate_ai_insight(request: AIInsightRequest):

    try:
        insight = ai_service.generate_insight(request)

        return {
            "success": True,
            "insight": insight
        }

    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=str(e)
        )