from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List

from app.db.crud import cars as crud_car
from app.schema import car as car_schema
from app.core.database import get_db
from app.api.auth import get_current_user
from app.db.models.users import User

router = APIRouter(prefix="/cars", tags=["cars"])

@router.post("/", response_model=car_schema.CarResponse, status_code=status.HTTP_201_CREATED)
def create_car(
    car: car_schema.CarCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    return crud_car.create_car(db, car, user_id=current_user.id)


@router.get("/", response_model=List[car_schema.CarResponse])
def list_all_cars(
    skip: int = 0,
    limit: int = 100,
    db: Session = Depends(get_db)
):
    return crud_car.get_cars(db, skip, limit)


@router.get("/me", response_model=List[car_schema.CarResponse])
def get_my_cars(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    return crud_car.get_cars_by_user(db, current_user.id)


@router.get("/{car_id}", response_model=car_schema.CarResponse)
def get_car(
    car_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    db_car = crud_car.get_car(db, car_id)
    if not db_car:
        raise HTTPException(status_code=404, detail="Car not found")
    if db_car.user_id != current_user.id:
        raise HTTPException(status_code=403, detail="You do not have access to this car")
    return db_car


@router.put("/{car_id}", response_model=car_schema.CarResponse)
def update_car(
    car_id: int,
    updates: car_schema.CarUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    db_car = crud_car.get_car(db, car_id)
    if not db_car:
        raise HTTPException(status_code=404, detail="Car not found")
    if db_car.user_id != current_user.id:
        raise HTTPException(status_code=403, detail="Unauthorized to update this car")
    return crud_car.update_car(db, db_car, updates)


@router.delete("/{car_id}", status_code=status.HTTP_200_OK)
def delete_car(
    car_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    db_car = crud_car.get_car(db, car_id)
    if not db_car:
        raise HTTPException(status_code=404, detail="Car not found")
    if db_car.user_id != current_user.id:
        raise HTTPException(status_code=403, detail="Unauthorized to delete this car")

    crud_car.delete_car(db, db_car)
    return {"message": f"Car with ID {car_id} deleted successfully"}
