from datetime import datetime
from sqlalchemy.orm import Session
from sqlalchemy import and_, or_
from typing import List, Optional
from app.db.crud.locations import get_or_create_location
from app.db.models.rides import Ride
from app.db.models.locations import Location
from app.schema.rides import RideCreate, RideUpdate

def get_ride(db: Session, ride_id: int) -> Optional[Ride]:
    return db.query(Ride).filter(Ride.id == ride_id).first()

def get_rides(db: Session, skip: int = 0, limit: int = 100) -> List[Ride]:
    return db.query(Ride).offset(skip).limit(limit).all()

def get_rides_by_driver(db: Session, driver_id: int) -> List[Ride]:
    return db.query(Ride).filter(Ride.driver_id == driver_id).all()

def create_ride(db: Session, ride: RideCreate, driver_id: int) -> Ride:
    # Convert addresses to location IDs
    start_location_id = get_or_create_location(db, user_id=driver_id, address=ride.start_location)
    end_location_id = get_or_create_location(db, user_id=driver_id, address=ride.end_location)

    db_ride = Ride(
        driver_id=driver_id,
        car_id=ride.car_id,
        start_time=ride.start_time,
        seats_available=ride.seats_available,
        status=ride.status,
        start_location_id=start_location_id,
        end_location_id=end_location_id
    )
    db.add(db_ride)
    db.commit()
    db.refresh(db_ride)
    return db_ride


def update_ride(db: Session, db_ride: Ride, updates: RideUpdate) -> Ride:
    for field, value in updates.dict(exclude_unset=True).items():
        setattr(db_ride, field, value)
    db.commit()
    db.refresh(db_ride)
    return db_ride

def delete_ride(db: Session, db_ride: Ride):
    db.delete(db_ride)
    db.commit()

def get_filtered_rides(
    db: Session,
    skip: int = 0,
    limit: int = 100,
    start_address: Optional[str] = None,
    end_address: Optional[str] = None,
    start_date: Optional[datetime] = None,
    end_date: Optional[datetime] = None
) -> List[Ride]:
    query = db.query(Ride)

    if start_address:
        query = query.join(Location, Ride.start_location_id == Location.id).filter(Location.address.ilike(f"%{start_address}%"))
    if end_address:
        query = query.join(Location, Ride.end_location_id == Location.id).filter(Location.address.ilike(f"%{end_address}%"))
    if start_date:
        query = query.filter(Ride.start_time >= start_date)
    if end_date:
        query = query.filter(Ride.start_time <= end_date)

    return query.offset(skip).limit(limit).all()