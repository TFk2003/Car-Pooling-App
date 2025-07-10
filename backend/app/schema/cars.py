# schema/car.py
from pydantic import BaseModel, HttpUrl
from typing import Optional


class CarBase(BaseModel):
    make: str
    model: str
    year: int
    color: str
    license_plate: str
    seats: int
    photo_url: Optional[HttpUrl]


class CarCreate(CarBase):
    pass


class CarUpdate(BaseModel):
    make: Optional[str]
    model: Optional[str]
    year: Optional[int]
    color: Optional[str]
    license_plate: Optional[str]
    seats: Optional[int]
    photo_url: Optional[HttpUrl]


class CarResponse(CarBase):
    id: int
    user_id: int

    class Config:
        orm_mode = True
