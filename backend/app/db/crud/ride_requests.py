from sqlalchemy.orm import Session
from typing import List, Optional
from app.db.models.ride_requests import RideRequest, RequestStatus
from app.schema.ride_requests import RideRequestCreate, RideRequestUpdate
from datetime import datetime

def get_request(db: Session, request_id: int) -> Optional[RideRequest]:
    return db.query(RideRequest).filter(RideRequest.id == request_id).first()

def get_requests(db: Session, skip: int = 0, limit: int = 100) -> List[RideRequest]:
    return db.query(RideRequest).offset(skip).limit(limit).all()

def get_requests_by_rider(db: Session, rider_id: int) -> List[RideRequest]:
    return db.query(RideRequest).filter(RideRequest.rider_id == rider_id).all()

def create_request(db: Session, request: RideRequestCreate, rider_id: int) -> RideRequest:
    db_request = RideRequest(
        rider_id=rider_id,
        message=request.message,
        recurring=request.recurring,
        requested_at=datetime.utcnow(),
        status=RequestStatus.pending,
        starting_location=request.starting_location,
        ending_location=request.ending_location,
    )
    db.add(db_request)
    db.commit()
    db.refresh(db_request)
    return db_request

def update_request(db: Session, db_request: RideRequest, updates: RideRequestUpdate) -> RideRequest:
    for field, value in updates.dict(exclude_unset=True).items():
        setattr(db_request, field, value)
    db.commit()
    db.refresh(db_request)
    return db_request

def reschedule_request(db: Session, db_request: RideRequest, new_time: datetime) -> RideRequest:
    db_request.requested_at = new_time
    db.commit()
    db.refresh(db_request)
    return db_request

def delete_request(db: Session, db_request: RideRequest):
    db.delete(db_request)
    db.commit()
