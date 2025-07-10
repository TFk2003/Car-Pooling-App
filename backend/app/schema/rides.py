# schema/ride.py
from enum import Enum
from pydantic import BaseModel
from datetime import datetime
from typing import Optional


class RideStatus(str, Enum):
    active = "active"
    completed = "completed"


class RideBase(BaseModel):
    start_time: datetime
    seats_available: int
    status: RideStatus
    base_fare: float


class RideCreate(RideBase):
    car_id: int
    start_location: str
    end_location: str


class RideUpdate(BaseModel):
    start_time: Optional[datetime]
    seats_available: Optional[int]
    status: Optional[RideStatus]
    base_fare: Optional[float]
    car_id: Optional[int]


class RideResponse(RideBase):
    id: int
    driver_id: int
    car_id: int
    start_location_id: int
    end_location_id: int

    class Config:
        orm_mode = True
