from decouple import config

from src.video.video_select import select_video
from src.video.video_insert import insert_multiple_video
from src.videos_manifest import list_files_in_directory
from src.video.youtube_video import *

from src.video.video_tag import *

video_raw_directory = ".././data/raw/videos/"
captions_list_raw_directory = ".././data/raw/captions-list/"
comment_threads_raw_directory = ".././data/raw/comment-threads/"

videos_manifest = list_files_in_directory(video_raw_directory)
captions_list_manifest = list_files_in_directory(captions_list_raw_directory)
comment_threads_manifest = list_files_in_directory(comment_threads_raw_directory)

print(captions_list_manifest)
print(comment_threads_manifest)

# Database connection parameters
db_params = {
    "host": "localhost",  # Replace with your PostgreSQL host
    "port": config("DB_PORT"),  # Specify the desired port number
    "database": "YouTubeSentimentData",  # Replace with your PostgreSQL database name
    "user": config("DB_USER"),  # Use config to retrieve the username from .env
    "password": config("DB_PASSWORD"),  # Use config to retrieve the password from .env
}

# select_video(db_params)
#insert_multiple_video(db_params, videos_manifest, video_raw_directory, return_all_video_section_data, parse_all_video_section_data)

# FROM POSTGRES DATABASE
#tags_corpus = create_tags_corpus(db_params, "../sql/video/video_read_tags.SQL")
#print(tags_corpus)
