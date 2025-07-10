from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List

from app.db.crud import ride_history as crud_rh
from app.schema import ride_history as schemas
from app.core.database import get_db
from app.api.auth import get_current_user
from app.db.models.users import User

router = APIRouter(prefix="/ride-history", tags=["ride-history"])

@router.post("/", response_model=schemas.RideHistoryResponse, status_code=status.HTTP_201_CREATED)
def create_ride_history(
    entry: schemas.RideHistoryCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    try:
        return crud_rh.create_history(db, entry, user_id=current_user.id)
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))


@router.get("/", response_model=List[schemas.RideHistoryResponse])
def list_all_histories(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    histories = crud_rh.get_all_histories(db, skip, limit)
    if not histories:
        raise HTTPException(status_code=404, detail="No ride history records found")
    return histories


@router.get("/user", response_model=List[schemas.RideHistoryResponse])
def get_my_history(current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    histories = crud_rh.get_user_history(db, user_id=current_user.id)
    if not histories:
        raise HTTPException(status_code=404, detail="No history records found")
    return histories


@router.get("/ride/{ride_id}", response_model=List[schemas.RideHistoryResponse])
def get_ride_history(ride_id: int, db: Session = Depends(get_db)):
    histories = crud_rh.get_ride_history(db, ride_id)
    if not histories:
        raise HTTPException(status_code=404, detail="No history records found for this ride")
    return histories


@router.get("/{history_id}", response_model=schemas.RideHistoryResponse)
def get_single_history(history_id: int, db: Session = Depends(get_db)):
    db_hist = crud_rh.get_history(db, history_id)
    if not db_hist:
        raise HTTPException(status_code=404, detail="History record not found")
    return db_hist


@router.delete("/{history_id}", status_code=status.HTTP_200_OK)
def delete_history_entry(
    history_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    db_hist = crud_rh.get_history(db, history_id)
    if not db_hist:
        raise HTTPException(status_code=404, detail="History record not found")

    if db_hist.user_id != current_user.id:
        raise HTTPException(status_code=403, detail="Not authorized to delete this history")

    crud_rh.delete_history(db, db_hist)
    return {"message": f"History entry {history_id} deleted successfully"}
