import json

from src.videos_manifest import list_files_in_directory
from src.youtube_video import find_statistics


# Example usage:
video_raw_directory = "./../data/raw/videos/"
videos_manifest = list_files_in_directory(video_raw_directory)
file_path = f"{video_raw_directory}{videos_manifest[0]}"


try:
    with open(file_path, "r", encoding="utf-8") as json_file:
        data = json.load(json_file)
        find_statistics(data)

except FileNotFoundError:
    print(f"File not found: {file_path}")
except json.JSONDecodeError as e:
    print(f"Error decoding JSON: {str(e)}")
except Exception as e:
    print(f"An error occurred: {str(e)}")
