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
        fieldnames = ['filename', 'created_at', 'format']
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

                    writer.writerow({
                        'filename': os.path.join(root, comment_file),
                        'created_at': created_at,
                        'format': file_format
                    })


def create_raw_comments_manifest_json(manifest_file_path, directory_path):
    # Create a list to store comment information
    comment_manifest = []

    # Recursively process all files in the directory and its subdirectories
    for root, dirs, files in os.walk(directory_path):
        for comment_file in files:
            if comment_file.endswith(".json"):
                # Extract the file extension as the "format"
                file_format = os.path.splitext(comment_file)[1].lstrip('.').lower()

                # Extract the "created_at" timestamp from the individual JSON file
                created_at = get_created_at_timestamp(root, comment_file)

                # Create a dictionary for the comment entry
                comment_entry = {
                    'filename': os.path.join(root, comment_file),
                    'created_at': created_at,
                    'format': file_format
                }

                # Append the comment entry to the manifest list
                comment_manifest.append(comment_entry)

    # Write the manifest to a JSON file
    with open(manifest_file_path, 'w') as json_file:
        json.dump(comment_manifest, json_file, indent=4)


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

