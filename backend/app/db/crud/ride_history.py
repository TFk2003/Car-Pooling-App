from sqlalchemy.orm import Session
from typing import List, Optional
from datetime import datetime

from models.locations import Location
from models.rides import Ride
from models.ride_history import RideHistory
from app.schema.ride_history import RideHistoryCreate
from app.utils.calculate_distance import haversine_distance


def get_history(db: Session, history_id: int) -> Optional[RideHistory]:
    return db.query(RideHistory).filter(RideHistory.id == history_id).first()

def get_all_histories(db: Session, skip: int = 0, limit: int = 100) -> List[RideHistory]:
    return db.query(RideHistory).offset(skip).limit(limit).all()

def get_user_history(db: Session, user_id: int) -> List[RideHistory]:
    return db.query(RideHistory).filter(RideHistory.user_id == user_id).all()

def get_ride_history(db: Session, ride_id: int) -> List[RideHistory]:
    return db.query(RideHistory).filter(RideHistory.ride_id == ride_id).all()


def create_history(db: Session, data: RideHistoryCreate) -> RideHistory:
    ride = db.query(Ride).filter(Ride.id == data.ride_id).first()
    if not ride:
        raise ValueError("Ride not found")

    start_location = db.query(Location).filter(Location.id == ride.start_location_id).first()
    end_location = db.query(Location).filter(Location.id == ride.end_location_id).first()

    # Default to None if coords are missing
    distance_km = None
    if start_location and end_location and start_location.latitude and end_location.latitude:
        distance_km = haversine_distance(
            start_location.latitude,
            start_location.longitude,
            end_location.latitude,
            end_location.longitude
        )

    db_history = RideHistory(
        user_id=data.user_id,
        ride_id=data.ride_id,
        role=data.role,
        joined_at=data.joined_at,
        completed_at=data.completed_at,
        rating_given=data.rating_given,
        rating_received=data.rating_received,
        distance_km=distance_km
    )

    db.add(db_history)
    db.commit()
    db.refresh(db_history)
    return db_history


def delete_history(db: Session, db_history: RideHistory):
    db.delete(db_history)
    db.commit()


def get_ride_distance(db: Session, ride_id: int) -> float:
    ride = db.query(Ride).filter(Ride.id == ride_id).first()
    if not ride:
        raise ValueError("Ride not found")

    start = db.query(Location).filter(Location.id == ride.start_location_id).first()
    end = db.query(Location).filter(Location.id == ride.end_location_id).first()

    if not (start and end and start.latitude and start.longitude and end.latitude and end.longitude):
        raise ValueError("Missing coordinates for distance calculation")

    return haversine_distance(
        start.latitude,
        start.longitude,
        end.latitude,
        end.longitude
    )
