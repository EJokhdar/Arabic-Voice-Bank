# Arabic-Voice-Bank

## With Docker

1. Setup Docker and Launch Docker Desktop
2. Go to database.py comment the "without docker" section and uncomment the "with docker" section
3. In the terminal, go into the project directory and run the command "docker-compose up"
4. Wait for all dependencies to install
5. Project is running!

## Without Docker

1. Make sure node.js and python3 are installed on your machine
2. Go to database.py uncomment the "without docker" section and comment the "with docker" section

### Backend

Optional: Create a virtual environment in the backend directory by running the command "python<version> -m venv <virtual-environment-name>"

1. In the terminal, go into the backend directory, and run the command "pip install -r requirements.txt"

2. After all requirements have been installed, run the command "uvicorn main:app --reload"

### Frontend

1. In the terminal, go into the frontend directory, and run the command "npm start"
  
  
  #### DB_URI, and AWS Keys have been removed from the code and Dockerfile because the trail for the Amazon S3 and Database expired
