from fastapi import APIRouter, Depends, HTTPException, status, Query
from sqlalchemy.orm import Session
from typing import List, Optional
from datetime import datetime

from app.db.crud import rides as crud_ride
from app.schema import rides as schemas
from app.core.database import get_db
from app.api.auth import get_current_user
from app.db.models.users import User

router = APIRouter(prefix="/rides", tags=["rides"])

@router.post("/", response_model=schemas.RideResponse, status_code=status.HTTP_201_CREATED)
def create_ride(
    ride: schemas.RideCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    if current_user.role_mode not in ("driver", "both"):
        raise HTTPException(status_code=403, detail="Only drivers can create rides")

    return crud_ride.create_ride(db, ride, driver_id=current_user.id)


@router.get("/", response_model=List[schemas.RideResponse])
def list_rides(
    skip: int = 0,
    limit: int = 100,
    start_address: Optional[str] = Query(None),
    end_address: Optional[str] = Query(None),
    start_date: Optional[datetime] = Query(None),
    end_date: Optional[datetime] = Query(None),
    db: Session = Depends(get_db),
):
    return crud_ride.get_filtered_rides(
        db,
        skip=skip,
        limit=limit,
        start_address=start_address,
        end_address=end_address,
        start_date=start_date,
        end_date=end_date
    )


@router.get("/{ride_id}", response_model=schemas.RideResponse)
def get_ride(ride_id: int, db: Session = Depends(get_db)):
    db_ride = crud_ride.get_ride(db, ride_id)
    if not db_ride:
        raise HTTPException(status_code=404, detail="Ride not found")
    return db_ride


@router.get("/driver/me", response_model=List[schemas.RideResponse])
def get_my_rides(db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    return crud_ride.get_rides_by_driver(db, current_user.id)


@router.put("/{ride_id}", response_model=schemas.RideResponse)
def update_ride(
    ride_id: int,
    updates: schemas.RideUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    db_ride = crud_ride.get_ride(db, ride_id)
    if not db_ride:
        raise HTTPException(status_code=404, detail="Ride not found")
    if db_ride.driver_id != current_user.id:
        raise HTTPException(status_code=403, detail="You are not the owner of this ride")

    return crud_ride.update_ride(db, db_ride, updates)


@router.delete("/{ride_id}", status_code=status.HTTP_200_OK)
def delete_ride(
    ride_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    db_ride = crud_ride.get_ride(db, ride_id)
    if not db_ride:
        raise HTTPException(status_code=404, detail="Ride not found")
    if db_ride.driver_id != current_user.id:
        raise HTTPException(status_code=403, detail="You are not the owner of this ride")

    crud_ride.delete_ride(db, db_ride)
    return {"message": f"Ride with ID {ride_id} deleted successfully"}
