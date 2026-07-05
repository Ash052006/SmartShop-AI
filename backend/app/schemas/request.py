from typing import Any, Dict, List

from pydantic import BaseModel, Field


class Event(BaseModel):
    event: str = Field(..., description="Type of user event")
    metadata: Dict[str, Any] = Field(default_factory=dict)


class EventStreamRequest(BaseModel):
    session_id: str
    events: List[Event]