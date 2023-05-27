from pydantic import BaseSettings
from functools import lru_cache

class Settings(BaseSettings):
    DB_URI: str = ""
    AWS_ACCESS_KEY_ID: str = ""
    AWS_SECRET_ACCESS_KEY: str = ""

@lru_cache
def get_settings():
    return Settings()

settings = get_settings()