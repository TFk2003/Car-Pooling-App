# schema/user.py
from pydantic import BaseModel, EmailStr, HttpUrl
from typing import Optional
from datetime import datetime
from enum import Enum


class RoleMode(str, Enum):
    driver = "driver"
    rider = "rider"
    both = "both"


class Gender(str, Enum):
    male = "male"
    female = "female"
    other = "other"


class UserBase(BaseModel):
    name: str
    email: EmailStr
    gender: Gender
    phone: str
    photo_url: Optional[HttpUrl]
    role_mode: RoleMode


class UserCreate(UserBase):
    pass


class UserUpdate(BaseModel):
    name: Optional[str]
    email: Optional[EmailStr]
    gender: Optional[Gender]
    phone: Optional[str]
    photo_url: Optional[HttpUrl]
    role_mode: Optional[RoleMode]


class UserResponse(UserBase):
    id: int
    trust_score: float
    created_at: datetime

    class Config:
        orm_mode = True
