import json

from src.videos_manifest import list_files_in_directory
from src.youtube_video import *


# Example usage:
video_raw_directory = "./../data/raw/videos/"
videos_manifest = list_files_in_directory(video_raw_directory)
file_path = f"{video_raw_directory}{videos_manifest[0]}"

print(return_video_data(file_path, find_video_id))
print(return_video_data(file_path, find_snippet))
print(return_video_data(file_path, find_content_details))
print(return_video_data(file_path, find_statistics))
print(return_video_data(file_path, find_topic_details))
