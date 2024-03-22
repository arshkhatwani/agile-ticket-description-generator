from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from models.auth import User
from utils.config import get_db_connection_string

def get_db_session(db_connection_string=get_db_connection_string()):
    engine = create_engine(db_connection_string)
    Session = sessionmaker(bind=engine)
    session = Session()
    return session

# Function to insert a new user into the users table
def create_user(email, name, image_url, session=get_db_session(db_connection_string=get_db_connection_string(database_name='/authentication'))):
    new_user = User(email=email, name=name, image_url=image_url)
    session.add(new_user)
    session.commit()
    return new_user

# Function to get user by email 
def get_user_by_email(email, session=get_db_session(db_connection_string=get_db_connection_string(database_name='/authentication'))):
    user = session.query(User).filter_by(email=email).first()
    return user

