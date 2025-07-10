from sqlalchemy import Column, Integer, String, Text, ForeignKey
from sqlalchemy.orm import relationship
from app.core.database import Base

class Car(Base):
    __tablename__ = "cars"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    make = Column(String, nullable=False)
    model = Column(String, nullable=False)
    year = Column(Integer, nullable=True)
    color = Column(String, nullable=True)
    license_plate = Column(String, nullable=False)
    seats = Column(Integer, nullable=False)
    photo_url = Column(Text, nullable=True)

    user = relationship("Users", back_populates="cars")
    rides = relationship("Rides", back_populates="cars")