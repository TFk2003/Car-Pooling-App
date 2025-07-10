from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.schema.messages import MessageCreate, MessageResponse
from app.db.crud import messages as message_crud
from typing import List

router = APIRouter(prefix="/messages", tags=["Messages"])

@router.post("/", response_model=MessageResponse)
def send_message(message: MessageCreate, db: Session = Depends(get_db)):
    return message_crud.create_message(db, message)

@router.get("/{message_id}", response_model=MessageResponse)
def read_message(message_id: int, db: Session = Depends(get_db)):
    db_message = message_crud.get_message(db, message_id)
    if not db_message:
        raise HTTPException(status_code=404, detail="Message not found")
    return db_message

@router.get("/chat/{user_a_id}/{user_b_id}", response_model=List[MessageResponse])
def get_chat(user_a_id: int, user_b_id: int, db: Session = Depends(get_db)):
    return message_crud.get_messages_between_users(db, user_a_id, user_b_id)

@router.get("/inbox/{user_id}", response_model=List[MessageResponse])
def get_inbox(user_id: int, db: Session = Depends(get_db)):
    return message_crud.get_inbox_for_user(db, user_id)
