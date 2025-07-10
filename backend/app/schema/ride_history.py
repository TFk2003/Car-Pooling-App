# schema/ride_history.py
from pydantic import BaseModel
from datetime import datetime
from typing import Optional


class RideHistoryBase(BaseModel):
    role: str
    joined_at: datetime
    completed_at: Optional[datetime]
    rating_given: Optional[int]
    rating_received: Optional[int]


class RideHistoryCreate(RideHistoryBase):
    ride_id: int


class RideHistoryResponse(RideHistoryBase):
    id: int
    user_id: int
    ride_id: int
    distance_km: Optional[float]

    class Config:
        orm_mode = True
