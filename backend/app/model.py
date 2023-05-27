from bcrypt import hashpw, gensalt
from .database import Base
from datetime import datetime, date
from sqlalchemy import Column, String, Integer, DateTime, Enum, ForeignKey
from sqlalchemy.orm import relationship
from .app_enums import GenderEnum


class User(Base):
    __tablename__="user_info"
    user_id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True, nullable=False)
    password = Column(String, nullable=False)
    gender = Column(Enum(GenderEnum), nullable=False, default=GenderEnum.male)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow)
    recordings = relationship("Recording", back_populates="user")

    def verify_password(self, password):
        return self.password == password


class Recording(Base):
    __tablename__ = "recordings"
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey('user_info.user_id'))
    prompt_id = Column(Integer)
    file_path = Column(String)
    user = relationship("User", back_populates="recordings")
