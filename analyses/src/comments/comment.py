import json
import os
from decouple import config

#from comment_parser import *
#from comment_insert import *

# Example usage:
comment_threads_path = "./../data/raw/comment-threads/"  # Replace with your actual path


db_params = {
    "host": "localhost",
    "port": config("DB_PORT"),
    "database": "YouTubeSentimentData",
    "user": config("DB_USER"),
    "password": config("DB_PASSWORD")
}

page_num = 1
video_id = "bxIF9X9k2IE"
file_path = f'./../data/raw/comment-threads/{video_id}/{video_id} PAGE{page_num}.json'

#comments_full = return_all_comment_thread_data(file_path)

#for comment in comments_full:
#    insert_comment(db_params, comment)



