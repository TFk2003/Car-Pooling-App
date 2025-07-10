# schema/message.py
from typing import Optional
from pydantic import BaseModel
from datetime import datetime


class MessageBase(BaseModel):
    content: str
    sent_at: datetime


class MessageCreate(MessageBase):
    receiver_id: int
    ride_id: int


class MessageUpdate(BaseModel):
    content: Optional[str]


class MessageResponse(MessageBase):
    id: int
    sender_id: int
    receiver_id: int
    ride_id: int

    class Config:
        orm_mode = True
