from sqlalchemy.orm import Session
from app.db.models.messages import Message
from app.schema.messages import MessageCreate
from datetime import datetime

def create_message(db: Session, message_data: MessageCreate, sender_id: int):
    db_message = Message(
        sender_id=sender_id,
        receiver_id=message_data.receiver_id,
        ride_id=message_data.ride_id,
        content=message_data.content,
        sent_at=message_data.sent_at or datetime.utcnow()
    )
    db.add(db_message)
    db.commit()
    db.refresh(db_message)
    return db_message

def get_message(db: Session, message_id: int):
    return db.query(Message).filter(Message.id == message_id).first()

def get_messages_between_users(db: Session, user_a_id: int, user_b_id: int):
    return db.query(Message).filter(
        ((Message.sender_id == user_a_id) & (Message.receiver_id == user_b_id)) |
        ((Message.sender_id == user_b_id) & (Message.receiver_id == user_a_id))
    ).order_by(Message.sent_at).all()

def get_inbox_for_user(db: Session, user_id: int):
    return db.query(Message).filter(
        (Message.sender_id == user_id) | (Message.receiver_id == user_id)
    ).order_by(Message.sent_at.desc()).all()
