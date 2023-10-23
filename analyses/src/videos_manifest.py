import os
import csv
import json

def list_files_in_directory(directory_path):
    # Initialize an empty list to store the file names
    file_list = []

    # Check if the directory exists
    if os.path.exists(directory_path) and os.path.isdir(directory_path):
        # Iterate through the files in the directory
        for filename in os.listdir(directory_path):
            # Check if the path is a file (not a subdirectory)
            file_path = os.path.join(directory_path, filename)
            if os.path.isfile(file_path):
                file_list.append(filename)

    return file_list

def create_raw_videos_manifest(manifest_file_path, directory_path):
    # List video files in the directory
    video_files = list_files_in_directory(directory_path)

    # Create a CSV file for the manifest
    with open(manifest_file_path, 'w', newline='') as csvfile:
        fieldnames = ['filename', 'created_at', 'format']
        writer = csv.DictWriter(csvfile, fieldnames=fieldnames)

        # Write the header row
        writer.writeheader()

        # Iterate through video files and write their information to the CSV
        for video_file in video_files:
            # Extract the file extension as the "format"
            file_format = os.path.splitext(video_file)[1].lstrip('.').lower()

            # Extract the "created_at" timestamp from the individual JSON file
            created_at = get_created_at_timestamp(directory_path, video_file)

            writer.writerow({
                'filename': video_file,
                'created_at': created_at,
                'format': file_format
            })

def get_created_at_timestamp(directory_path, video_file):
    json_file_path = os.path.join(directory_path, video_file)

    # Check if the JSON file exists
    if os.path.exists(json_file_path) and os.path.isfile(json_file_path):
        # Load the JSON data and retrieve the "fetchTimestamp" if available
        with open(json_file_path, 'r', encoding='utf-8') as json_file:
            data = json.load(json_file)
            return data.get("fetchTimestamp", "N/A")

    return "N/A"  # Return a default value if the JSON file doesn't exist or lacks the timestamp

# Your list_files_in_directory function remains the same

# Usage
manifest_file_path = "./../data/raw/raw_videos_manifest.csv"  # Specify the path for the manifest CSV
directory_path = "./../data/raw/videos/"  # Specify the path to your video files directory
create_raw_videos_manifest(manifest_file_path, directory_path)
