from fastapi import APIRouter, HTTPException

from app.schemas.request import EventStreamRequest
from app.services.validator import EventValidator
from app.services.feature_extractor import FeatureExtractor
from app.services.rule_engine import RuleEngine
from app.services.conflict_resolver import ConflictResolver
from app.services.confidence_engine import ConfidenceEngine
from app.services.confidence_engine import ConfidenceEngine
from app.services.explainability_engine import ExplainabilityEngine
from app.services.recommendation_engine import RecommendationEngine
router = APIRouter(
    prefix="/classify",
    tags=["Classification"]
)


@router.post("/")
def classify(request: EventStreamRequest):
    """
    Main Personalization Engine Endpoint

    Pipeline:
    1. Validate input events
    2. Extract behavioural features
    3. Evaluate all shopper rules
    """

    # -------------------------
    # Step 1 : Validate Events
    # -------------------------

    is_valid, invalid_events = EventValidator.validate(request.events)

    if not is_valid:
        raise HTTPException(
            status_code=400,
            detail={
                "message": "Invalid event(s) found.",
                "invalid_events": invalid_events
            }
        )

    # -------------------------
    # Step 2 : Feature Extraction
    # -------------------------

    features = FeatureExtractor.extract(request.events)

    # -------------------------
    # Step 3 : Rule Evaluation
    # -------------------------

    matched_rules = RuleEngine.evaluate(features)


    winner = ConflictResolver.resolve(
        matched_rules,
        features["engagement_score"]
    )

    confidence = ConfidenceEngine.calculate(winner)

    evidence = ExplainabilityEngine.explain(winner)

    recommendations = RecommendationEngine.recommend(winner)
    # -------------------------
    # Response
    # -------------------------

    return {
    "success": True,
    "session_id": request.session_id,

    "classification": winner["shopper_state"] if winner else None,

    "confidence": confidence,

    "persona": winner["persona"] if winner else None,

    "evidence": evidence,

    "recommendations": recommendations,

    "features": features
}