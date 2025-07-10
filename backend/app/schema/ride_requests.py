# schema/ride_request.py
from pydantic import BaseModel
from datetime import datetime
from enum import Enum
from typing import Optional


class RequestStatus(str, Enum):
    pending = "pending"
    accepted = "accepted"
    rejected = "rejected"
    cancelled = "cancelled"


class RideRequestBase(BaseModel):
    status: RequestStatus = RequestStatus.pending
    requested_at: datetime
    message: Optional[str]
    recurring: bool
    starting_location: str
    ending_location: str


class RideRequestCreate(BaseModel):
    message: Optional[str]
    recurring: bool
    starting_location: str
    ending_location: str


class RideRequestUpdate(BaseModel):
    status: RequestStatus


class RideRequestResponse(RideRequestBase):
    id: int
    rider_id: int

    class Config:
        orm_mode = True
