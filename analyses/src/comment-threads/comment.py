import json
import os
from decouple import config

from comment_parser import *
from comment_insert import *

db_params = {
    "host": "localhost",
    "port": config("DB_PORT"),
    "database": "YouTubeSentimentData",
    "user": config("DB_USER"),
    "password": config("DB_PASSWORD")
}

page_num = 1
file_path = f'./../data/raw/comment-threads/bxIF9X9k2IE/bxIF9X9k2IE PAGE{page_num}.json'

comments_full = return_all_comment_thread_data(file_path)

#for comment in comments_full:
#    insert_comment(db_params, comment)



