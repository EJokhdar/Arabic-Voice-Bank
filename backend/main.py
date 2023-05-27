from fastapi import HTTPException, FastAPI, File, UploadFile, Depends, Header
from fastapi.responses import JSONResponse, RedirectResponse
from sqlalchemy import func
from sqlalchemy.orm import Session
from fastapi.middleware.cors import CORSMiddleware
from app.database import s3
from datetime import datetime, timedelta
from jose import jwt, JWTError
from app.schema import UserCreateRequest, UserCreateResponse, Token, TokenData, RecordingCreateRequest, RecordingCreateResponse
from app.model import User, Recording
from app.dependencies import get_db_session

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

SECRET_KEY = "supersecretkey"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30

@app.post("/uploadfile/")
def create_upload_file(file: UploadFile = File(...)):
    try:
        # Upload file to S3 bucket
        s3.upload_fileobj(file.file, 'arabicvoicebank', file.filename)
        # Return success message
        return {"message": f"File '{file.filename}' uploaded successfully."}
    except Exception as e:
        # Return error message if upload fails
        return {"error": str(e)}
    

def create_access_token(data: dict, expires_delta: timedelta):
    to_encode = data.copy()
    expire = datetime.utcnow() + expires_delta
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

@app.post("/users", response_model=UserCreateResponse)
def create_user(user: UserCreateRequest, db: Session = Depends(get_db_session)):
    db_user = User(email=user.email, password=user.password, gender=user.gender)
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

@app.post("/recording", response_model=RecordingCreateResponse)
def create_recording(recording: RecordingCreateRequest, db: Session = Depends(get_db_session)):
    db_recording = Recording(user_id=recording.user_id, prompt_id=recording.prompt_id, file_path=recording.file_path)
    db.add(db_recording)
    db.commit()
    db.refresh(db_recording)
    return db_recording

@app.post("/token", response_model=Token)
def login_for_access_token(data: TokenData, db: Session = Depends(get_db_session)):
    user = db.query(User).filter(User.email == data.email).first()
    if not user:
        raise HTTPException(status_code=400, detail="Incorrect email or password")
    if not user.verify_password(data.password):
        raise HTTPException(status_code=400, detail="Incorrect email or password")

    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(data={"sub": user.email}, expires_delta=access_token_expires)
    return {"access_token": access_token, "token_type": "bearer"}

async def verify_token(token: str = Header(None)):
    if token is None:
        raise HTTPException(status_code=401, detail="Not authenticated")
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        user_email = payload.get("sub")
        if user_email is None:
            raise HTTPException(status_code=401, detail="Not authenticated")
        return user_email
    except JWTError:
        raise HTTPException(status_code=401, detail="Not authenticated")


@app.get("/dashboard/")
def dashboard(token: str = Header(None), db: Session = Depends(get_db_session)):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        email: str = payload.get("sub")
        if email is None:
            raise HTTPException(status_code=401, detail="Invalid authentication credentials")
        user = db.query(User).filter(User.email == email).first()
        if user is None:
            raise HTTPException(status_code=401, detail="User not found")
        # create user session for dashboard
        # ...
        redirect_url = "http://localhost:3000/dashboard"  # Replace with your front-end URL
        return RedirectResponse(redirect_url)
    except JWTError:
        raise HTTPException(status_code=401, detail="Invalid authentication credentials")


@app.get("/users/me")
def read_user_me(token: str = Depends(verify_token), db: Session = Depends(get_db_session)):
    user = db.query(User).filter(User.email == token).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return {"user_id": user.user_id, "email": user.email, "gender": user.gender}


@app.put("/users/me/password")
def update_password(new_password: str, current_password: str, token: str = Depends(verify_token), db: Session = Depends(get_db_session)):
    user = db.query(User).filter(User.email == token).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    if not user.verify_password(current_password):
        raise HTTPException(status_code=400, detail="Incorrect current password")
    user.password = new_password
    db.add(user)
    db.commit()
    return {"message": "Password updated successfully"}

@app.get("/recording/progress")
def get_progress(user_id: int, db: Session = Depends(get_db_session)):
    stmt = db.query(func.max(Recording.prompt_id)).filter(Recording.user_id == user_id).scalar()
    return stmt

@app.delete("/recordings/{user_id}")
def delete_recordings(user_id: int, db: Session = Depends(get_db_session)):
    db.query(Recording).filter(Recording.user_id == user_id).delete()
    db.commit()
    return {"message": "Recordings deleted successfully."}
