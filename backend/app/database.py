import boto3
from .config import settings
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base


#WITHOUT DOCKER:

s3 = boto3.client('s3',
                  aws_access_key_id="######",
                  aws_secret_access_key="######")

engine = create_engine("######")

#WITH DOCKER:

# s3 = boto3.client('s3',
#                   aws_access_key_id=settings.AWS_ACCESS_KEY_ID,
#                   aws_secret_access_key=settings.AWS_SECRET_ACCESS_KEY)

# engine = create_engine(settings.DB_URI)

SessionLocal = sessionmaker(bind=engine)
Base = declarative_base() 