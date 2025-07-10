from sqlalchemy import Column, Integer, String, Enum, DateTime, Boolean, ForeignKey
from sqlalchemy.orm import relationship
from app.core.database import Base
import enum

class RequestStatus(str, enum.Enum):
    pending = "pending"
    accepted = "accepted"
    rejected = "rejected"
    cancelled = "cancelled"

class RideRequest(Base):
    __tablename__ = "ride_requests"

    id = Column(Integer, primary_key=True, index=True)
    rider_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    status = Column(Enum(RequestStatus), default=RequestStatus.pending, nullable=False)
    requested_at = Column(DateTime, nullable=False)
    message = Column(String, nullable=True)
    recurring = Column(Boolean, default=False)

    starting_location = Column(String, nullable=False)
    ending_location = Column(String, nullable=False)

    rider = relationship("Users", back_populates="ride_requests")
    ride = relationship("Rides", back_populates="ride_request", uselist=False)
