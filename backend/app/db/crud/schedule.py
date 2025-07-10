from sqlalchemy.orm import Session
from typing import List, Optional
from models.schedule import Schedule
from app.schema.schedule import ScheduleCreate, ScheduleUpdate

def get_schedule(db: Session, schedule_id: int) -> Optional[Schedule]:
    return db.query(Schedule).filter(Schedule.id == schedule_id).first()

def get_schedules(db: Session, skip: int = 0, limit: int = 100) -> List[Schedule]:
    return db.query(Schedule).offset(skip).limit(limit).all()

def get_schedules_by_user(db: Session, user_id: int) -> List[Schedule]:
    return db.query(Schedule).filter(Schedule.user_id == user_id).all()

def create_schedule(db: Session, schedule: ScheduleCreate, user_id: int) -> Schedule:
    db_schedule = Schedule(**schedule.dict(), user_id=user_id)
    db.add(db_schedule)
    db.commit()
    db.refresh(db_schedule)
    return db_schedule

def update_schedule(db: Session, db_schedule: Schedule, updates: ScheduleUpdate) -> Schedule:
    for field, value in updates.dict(exclude_unset=True).items():
        setattr(db_schedule, field, value)
    db.commit()
    db.refresh(db_schedule)
    return db_schedule

def delete_schedule(db: Session, db_schedule: Schedule):
    db.delete(db_schedule)
    db.commit()
