import psycopg2
from decouple import config

from src.video.video_select import *
from src.video.video_insert import *

# Database connection parameters
db_params = {
    'host': 'localhost',  # Replace with your PostgreSQL host
    'database': 'YouTubeSentimentData',  # Replace with your PostgreSQL database name
    'user': config("DB_USER"),  # Use config to retrieve the username from .env
    'password': config("DB_PASSWORD"),  # Use config to retrieve the password from .env
}

select_video(db_params)
# insert_video(db_params, column_values)
