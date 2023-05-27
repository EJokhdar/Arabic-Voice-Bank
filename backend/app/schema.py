from pydantic import BaseModel
from .app_enums import GenderEnum
from datetime import datetime

class UserCreateRequest(BaseModel):
    email: str
    password: str
    gender: GenderEnum

class UserCreateResponse(UserCreateRequest):
    user_id: int
    created_at: datetime
    updated_at: datetime

    class Config:
        orm_mode = True

class RecordingCreateRequest(BaseModel):
    user_id: int
    prompt_id: int
    file_path: str

class RecordingCreateResponse(RecordingCreateRequest):
    id: int

    class Config:
        orm_mode = True

class Token(BaseModel):
    access_token: str
    token_type: str

class TokenData(BaseModel):
    email: str = None
    password: str = None
