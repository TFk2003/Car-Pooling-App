# app/db/crud/locations.py

from sqlalchemy.orm import Session
from typing import List, Optional
from app.db.models.locations import Location
from app.schema.locations import LocationCreate
from app.utils.address_converter import fetch_coordinates


def get_location(db: Session, location_id: int) -> Optional[Location]:
    return db.query(Location).filter(Location.id == location_id).first()


def get_locations_by_user(db: Session, user_id: int) -> List[Location]:
    return db.query(Location).filter(Location.user_id == user_id).all()


def create_location(db: Session, location: LocationCreate, user_id: int) -> Location:
    # Auto-fetch coordinates if not provided
    if location.latitude is None or location.longitude is None:
        coords = fetch_coordinates(location.address)
        if coords:
            location.latitude, location.longitude = coords

    db_location = Location(**location.dict(), user_id=user_id)
    db.add(db_location)
    db.commit()
    db.refresh(db_location)
    return db_location


def delete_location(db: Session, db_location: Location):
    db.delete(db_location)
    db.commit()


def get_or_create_location(db: Session, user_id: int, address: str) -> int:
    location = (
        db.query(Location)
        .filter(Location.user_id == user_id, Location.address == address)
        .first()
    )
    if location:
        return location.id

    lat, lng = fetch_coordinates(address) or (None, None)
    new_location = Location(
        user_id=user_id,
        address=address,
        latitude=lat,
        longitude=lng
    )
    db.add(new_location)
    db.commit()
    db.refresh(new_location)
    return new_location.id
