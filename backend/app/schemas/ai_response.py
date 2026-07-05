from pydantic import BaseModel


class AIInsightResponse(BaseModel):

    customer_summary: str

    business_impact: str

    marketing_strategy: str

    next_best_action: str

    conversion_probability: str

    risk_level: str