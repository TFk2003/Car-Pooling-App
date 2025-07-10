from sqlalchemy import Column, Integer, String, Enum, Float, DateTime
from sqlalchemy.orm import relationship
from app.core.database import Base
import enum
from datetime import datetime


class RoleMode(str, enum.Enum):
    driver = "driver"
    rider = "rider"
    both = "both"

class Gender(str, enum.Enum):
    male = "male"
    female = "female"
    other = "other"

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    email = Column(String, unique=True, nullable=False, index=True)
    gender = Column(Enum(Gender), nullable=False)
    phone = Column(String, unique=True, nullable=False)
    photo_url = Column(String, nullable=True)
    trust_score = Column(Float, default=5.0)
    role_mode = Column(Enum(RoleMode), nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)

    cars = relationship("Car", back_populates="users")
    schedule = relationship("Schedule", back_populates="users")
    preferred_locations = relationship("Location", back_populates="users")
    ride_requests = relationship("RideRequest", back_populates="rider")
    ride_histories = relationship("RideHistory", back_populates="users")
