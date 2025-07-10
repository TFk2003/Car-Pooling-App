from sqlalchemy import Column, Integer, Enum, ForeignKey, Float, DateTime
from sqlalchemy.orm import relationship
from app.core.database import Base
import enum

class RideStatus(str, enum.Enum):
    active = "active"
    completed = "completed"

class Ride(Base):
    __tablename__ = "rides"

    id = Column(Integer, primary_key=True, index=True)
    driver_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    car_id = Column(Integer, ForeignKey("cars.id"), nullable=False)
    start_location_id = Column(Integer, ForeignKey("locations.id"), nullable=False)
    end_location_id = Column(Integer, ForeignKey("locations.id"), nullable=False)
    start_time = Column(DateTime, nullable=False)
    status = Column(Enum(RideStatus), default=RideStatus.active)
    base_fare = Column(Float, nullable=False)
    seats_available = Column(Integer, nullable=False)

    car = relationship("Cars", back_populates="rides")
    messages = relationship("Messages", back_populates="ride")
    ride_histories = relationship("RideHistory", back_populates="ride")

    ride_request_id = Column(Integer, ForeignKey("ride_requests.id"), nullable=True)
    ride_request = relationship("RideRequests", back_populates="ride")
