from sqlalchemy import Column, Integer, String, ForeignKey, DateTime, Float
from sqlalchemy.orm import relationship
from app.core.database import Base

class RideHistory(Base):
    __tablename__ = "ride_histories"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    ride_id = Column(Integer, ForeignKey("rides.id"), nullable=False)

    role = Column(String, nullable=False)
    joined_at = Column(DateTime, nullable=False)
    completed_at = Column(DateTime, nullable=True)

    rating_given = Column(Integer, nullable=True)
    rating_received = Column(Integer, nullable=True)
    distance_km = Column(Float, nullable=True)

    user = relationship("Users", back_populates="ride_histories")
    ride = relationship("Rides", back_populates="ride_histories")
