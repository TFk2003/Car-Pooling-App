# schema/schedule.py
from typing import Optional
from pydantic import BaseModel
from datetime import time


class ScheduleBase(BaseModel):
    day_of_week: int
    start_time: time
    end_time: time


class ScheduleCreate(ScheduleBase):
    pass

class ScheduleUpdate(BaseModel):
    day_of_week: Optional[int]
    start_time: Optional[time]
    end_time: Optional[time]

class ScheduleResponse(ScheduleBase):
    id: int
    user_id: int

    class Config:
        orm_mode = True
