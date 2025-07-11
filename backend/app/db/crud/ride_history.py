from sqlalchemy.orm import Session
from typing import List, Optional
from datetime import datetime
from app.db.models.ride_history import RideHistory

def get_user_ride_history(db: Session, user_id: int) -> List[RideHistory]:
    """Get all ride history for a user (both as driver and rider)"""
    return db.query(RideHistory).filter(RideHistory.user_id == user_id).all()

def create_ride_history_entry(db: Session, user_id: int, ride_id: int, role: str) -> RideHistory:
    """Create a new ride history entry"""
    db_history = RideHistory(
        user_id=user_id,
        ride_id=ride_id,
        role=role,
        joined_at=datetime.utcnow()
    )
    db.add(db_history)
    db.commit()
    db.refresh(db_history)
    return db_history

def complete_ride_history(db: Session, history_id: int, rating_given: int = None) -> Optional[RideHistory]:
    """Mark a ride as completed and optionally add rating"""
    db_history = db.query(RideHistory).filter(RideHistory.id == history_id).first()
    if not db_history:
        return None
    
    db_history.completed_at = datetime.utcnow()
    if rating_given:
        db_history.rating_given = rating_given
    
    db.commit()
    db.refresh(db_history)
    return db_history

def update_received_rating(db: Session, user_id: int, ride_id: int, rating: int) -> Optional[RideHistory]:
    """Update the rating received by a user for a specific ride"""
    db_history = db.query(RideHistory).filter(
        RideHistory.user_id == user_id,
        RideHistory.ride_id == ride_id
    ).first()
    
    if not db_history:
        return None
    
    db_history.rating_received = rating
    db.commit()
    db.refresh(db_history)
    return db_history