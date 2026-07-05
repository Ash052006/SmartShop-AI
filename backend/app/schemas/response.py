from pydantic import BaseModel
from typing import List


class ClassificationResponse(BaseModel):
    persona: str
    predicted_segment: str
    confidence: float
    explanation: str
    recommendation: List[str]
