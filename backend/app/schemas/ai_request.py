from pydantic import BaseModel
from typing import Dict, List


class AIInsightRequest(BaseModel):
    classification: str
    confidence: int
    persona: str

    features: Dict

    evidence: List[str]

    recommendations: List[str]