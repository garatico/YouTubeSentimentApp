import json
from decouple import config

from src.video.video_insert import insert_video
from src.videos_manifest import list_files_in_directory
from src.video.youtube_video import *

video_raw_directory = "data/raw/videos/"
videos_manifest = list_files_in_directory(video_raw_directory)
file_path = f"{video_raw_directory}{videos_manifest[0]}"

full_video = return_all_video_section_data(file_path)
full_video_columns = parse_all_video_section_data(full_video)

print(full_video_columns)

# Database connection parameters
db_params = {
    'host': 'localhost',  # Replace with your PostgreSQL host
    'database': 'YouTubeSentimentData',  # Replace with your PostgreSQL database name
    'user': config("DB_USER"),  # Use config to retrieve the username from .env
    'password': config("DB_PASSWORD"),  # Use config to retrieve the password from .env
}

insert_video(db_params, full_video_columns)
