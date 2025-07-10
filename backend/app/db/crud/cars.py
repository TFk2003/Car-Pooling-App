from sqlalchemy.orm import Session
from typing import List, Optional

from app.db.models.cars import Car
from app.schema.cars import CarCreate, CarUpdate


def get_car(db: Session, car_id: int) -> Optional[Car]:
    return db.query(Car).filter(Car.id == car_id).first()


def get_cars(db: Session, skip: int = 0, limit: int = 100) -> List[Car]:
    return db.query(Car).offset(skip).limit(limit).all()


def get_cars_by_user(db: Session, user_id: int) -> List[Car]:
    return db.query(Car).filter(Car.user_id == user_id).all()


def create_car(db: Session, car: CarCreate, user_id: int) -> Car:
    db_car = Car(**car.dict(), user_id=user_id)
    db.add(db_car)
    db.commit()
    db.refresh(db_car)
    return db_car


def update_car(db: Session, db_car: Car, updates: CarUpdate) -> Car:
    for field, value in updates.dict(exclude_unset=True).items():
        setattr(db_car, field, value)
    db.commit()
    db.refresh(db_car)
    return db_car


def delete_car(db: Session, db_car: Car):
    db.delete(db_car)
    db.commit()
