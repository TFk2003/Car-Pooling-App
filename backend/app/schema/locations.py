# schema/location.py
from pydantic import BaseModel
from typing import Optional


class LocationBase(BaseModel):
    tag: Optional[str]
    address: str
    latitude: Optional[float] = None
    longitude: Optional[float] = None


class LocationCreate(LocationBase):
    pass


class LocationUpdate(LocationBase):
    tag: Optional[str]
    address: Optional[str]
    latitude: Optional[float]
    longitude: Optional[float]


class LocationResponse(LocationBase):
    id: int
    user_id: int

    class Config:
        orm_mode = True
