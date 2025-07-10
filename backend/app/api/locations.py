# app/api/locations.py

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List

from app.db.crud import locations as crud_location
from app.schema import locations as schemas
from app.core.database import get_db
from app.api.auth import get_current_user
from app.db.models.users import User

router = APIRouter(prefix="/locations", tags=["locations"])


@router.post("/", response_model=schemas.LocationResponse, status_code=status.HTTP_201_CREATED)
def create_location(
    location: schemas.LocationCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    return crud_location.create_location(db, location, current_user.id)


@router.get("/", response_model=List[schemas.LocationResponse])
def list_my_locations(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    return crud_location.get_locations_by_user(db, current_user.id)


@router.get("/{location_id}", response_model=schemas.LocationResponse)
def get_location(
    location_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    db_location = crud_location.get_location(db, location_id)
    if not db_location or db_location.user_id != current_user.id:
        raise HTTPException(status_code=404, detail="Location not found or unauthorized")
    return db_location


@router.delete("/{location_id}", status_code=status.HTTP_200_OK)
def delete_location(
    location_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    db_location = crud_location.get_location(db, location_id)
    if not db_location or db_location.user_id != current_user.id:
        raise HTTPException(status_code=404, detail="Location not found or unauthorized")
    crud_location.delete_location(db, db_location)
    return {"message": f"Location {location_id} deleted successfully"}
