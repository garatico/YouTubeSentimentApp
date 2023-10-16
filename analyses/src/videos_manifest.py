import os


def create_raw_videos_manifest():
    return


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
