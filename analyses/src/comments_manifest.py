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


def create_raw_comments_manifest_csv(manifest_file_path, directory_path):
    # Create a CSV file for the manifest
    with open(manifest_file_path, 'w', newline='') as csvfile:
        fieldnames = ['filename', 'video_id', 'created_at', 'format']
        writer = csv.DictWriter(csvfile, fieldnames=fieldnames)

        # Write the header row
        writer.writeheader()

        # Recursively process all files in the directory and its subdirectories
        for root, dirs, files in os.walk(directory_path):
            for comment_file in files:
                if comment_file.endswith(".json"):
                    # Extract the file extension as the "format"
                    file_format = os.path.splitext(comment_file)[1].lstrip('.').lower()

                    # Extract the "created_at" timestamp from the individual JSON file
                    created_at = get_created_at_timestamp(root, comment_file)

                    # Use os.path.basename to get just the filename without the directory
                    filename = os.path.basename(comment_file)

                    # Split the filename at " PAGE" to get the video_id
                    video_id = filename.split(" PAGE")[0]

                    writer.writerow({
                        'filename': filename,
                        'video_id': video_id,
                        'created_at': created_at,
                        'format': file_format
                    })


def create_raw_comments_manifest_json(manifest_file_path, directory_path):
    manifest_data = []

    # Recursively process all files in the directory and its subdirectories
    for root, dirs, files in os.walk(directory_path):
        for comment_file in files:
            if comment_file.endswith(".json"):
                # Extract the file extension as the "format"
                file_format = os.path.splitext(comment_file)[1].lstrip('.').lower()

                # Extract the "created_at" timestamp from the individual JSON file
                created_at = get_created_at_timestamp(root, comment_file)

                # Use os.path.basename to get just the filename without the directory
                filename = os.path.basename(comment_file)

                # Split the filename at " PAGE" to get the video_id
                video_id = filename.split(" PAGE")[0]

                manifest_entry = {
                    'filename': filename,
                    'video_id': video_id,
                    'created_at': created_at,
                    'format': file_format
                }

                manifest_data.append(manifest_entry)

    # Write the manifest data to a JSON file
    with open(manifest_file_path, 'w') as json_file:
        json.dump(manifest_data, json_file)


def get_created_at_timestamp(directory_path, video_file):
    json_file_path = os.path.join(directory_path, video_file)

    # Check if the JSON file exists
    if os.path.exists(json_file_path) and os.path.isfile(json_file_path):
        # Load the JSON data and retrieve the "fetchTimestamp" if available
        with open(json_file_path, 'r', encoding='utf-8') as json_file:
            data = json.load(json_file)
            return data.get("fetchTimestamp", "N/A")

    return "N/A"  # Return a default value if the JSON file doesn't exist or lacks the timestamp

# Usage
manifest_file_path_csv = "./../data/raw/raw_comments_manifest.csv"  # Specify the path for the manifest CSV
manifest_file_path_json = "./../data/raw/raw_comments_manifest.json"  # Specify the path for the manifest CSV
directory_path = "./../data/raw/comment-threads/"  # Specify the path to your video files directory

create_raw_comments_manifest_csv(manifest_file_path_csv, directory_path)
create_raw_comments_manifest_json(manifest_file_path_json, directory_path)

