from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List

from app.db.crud import ride_requests as crud_rr
from app.schema import ride_requests as schemas
from app.core.database import get_db
from app.api.auth import get_current_user
from app.db.models.users import User

router = APIRouter(prefix="/ride-requests", tags=["ride-requests"])

@router.post("/", response_model=schemas.RideRequestResponse, status_code=status.HTTP_201_CREATED)
def create_ride_request(
    request: schemas.RideRequestCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    return crud_rr.create_request(db, request, rider_id=current_user.id)


@router.get("/", response_model=List[schemas.RideRequestResponse])
def list_ride_requests(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    requests = crud_rr.get_requests(db, skip=skip, limit=limit)
    if not requests:
        raise HTTPException(status_code=404, detail="No ride requests found")
    return requests


@router.get("/me", response_model=List[schemas.RideRequestResponse])
def get_my_requests(db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    requests = crud_rr.get_requests_by_rider(db, current_user.id)
    if not requests:
        raise HTTPException(status_code=404, detail="No ride requests found for you")
    return requests


@router.get("/{request_id}", response_model=schemas.RideRequestResponse)
def get_single_request(request_id: int, db: Session = Depends(get_db)):
    db_req = crud_rr.get_request(db, request_id)
    if not db_req:
        raise HTTPException(status_code=404, detail="Ride request not found")
    return db_req


@router.put("/{request_id}", response_model=schemas.RideRequestResponse)
def update_request_status(
    request_id: int,
    updates: schemas.RideRequestUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    db_req = crud_rr.get_request(db, request_id)
    if not db_req:
        raise HTTPException(status_code=404, detail="Ride request not found")

    if db_req.rider_id != current_user.id:
        raise HTTPException(status_code=403, detail="Unauthorized to update this request")

    return crud_rr.update_request(db, db_req, updates)


@router.delete("/{request_id}", status_code=status.HTTP_200_OK)
def delete_ride_request(
    request_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    db_req = crud_rr.get_request(db, request_id)
    if not db_req:
        raise HTTPException(status_code=404, detail="Ride request not found")

    if db_req.rider_id != current_user.id:
        raise HTTPException(status_code=403, detail="Unauthorized to delete this request")

    crud_rr.delete_request(db, db_req)
    return {"message": f"Ride request {request_id} deleted successfully"}
