import json

def parse_all_video_section_data(video_data):
    column_values = {
        'video_id': video_data['find_video_id'][0],
        'publishedAt' : video_data['find_snippet'][0][0]['publishedAt'],
        'channelId' : video_data['find_snippet'][0][0]['channelId']
    }
    return(column_values)

def return_all_video_section_data(file_path):
    return(return_multiple_video_section_data(
        file_path, find_video_id, find_snippet, find_content_details, find_statistics, find_topic_details)
        )

def return_multiple_video_section_data(file_path, *data_functions):
    all_video_data = {}  # Initialize an empty dictionary to store processed data

    for func in data_functions:
        all_video_data[func.__name__] = []  # Create an empty list for each function

    try:
        with open(file_path, "r", encoding="utf-8") as json_file:
            data = json.load(json_file)
            for func in data_functions:
                video_data = func(data)
                if video_data is not None:
                    all_video_data[func.__name__].append(video_data)
    except json.JSONDecodeError as e:
        print(f"Error decoding JSON in {file_path}: {str(e)}")
    except Exception as e:
        print(f"An error occurred in {file_path}: {str(e)}")

    return all_video_data


def return_video_section_data(file_path, data_function):
    try:
        with open(file_path, "r", encoding="utf-8") as json_file:
            data = json.load(json_file)
            video_data = data_function(data)
            return video_data

    except FileNotFoundError:
        print(f"File not found: {file_path}")
    except json.JSONDecodeError as e:
        print(f"Error decoding JSON: {str(e)}")
    except Exception as e:
        print(f"An error occurred: {str(e)}")
        return


# Returns the Video ID of a raw video JSON
def find_video_id(data):
    if "items" in data:
        items = data["items"]
        for item in items:
            if "id" in item:
                return item["id"]
    return None


# Returns the snippet category of raw video JSON
def find_snippet(data):
    # Initialize an empty list to store snippet data
    snippet_list = []

    if "items" in data:
        items = data["items"]
        for item in items:
            if "snippet" in item:
                snippet = item["snippet"]
                # Check if the snippet contains unwanted keys and remove them
                if "thumbnails" in snippet:
                    del snippet["thumbnails"]
                if "localized" in snippet:
                    del snippet["localized"]
                snippet_list.append(snippet)
            else:
                print("No 'snippet' key found in one or more 'items.")
    else:
        print("No 'items' key found in the JSON data.")

    return snippet_list


# Returns the content details of raw video JSON
def find_content_details(data):
    # Initialize an empty list to store snippet data
    content_list = []

    if "items" in data:
        items = data["items"]
        for item in items:
            if "contentDetails" in item:
                content = item["contentDetails"]
                # Check if the snippet contains unwanted keys and remove them
                if "regionRestriction" in content:
                    del content["regionRestriction"]
                if "contentRating" in content:
                    del content["contentRating"]
                content_list.append(content)
            else:
                print("No 'content' key found in one or more 'items.")
    else:
        print("No 'items' key found in the JSON data.")

    return content_list


# Returns the statistics of raw video JSON
def find_statistics(data):
    # Initialize an empty list to store statistics
    statistics_list = []

    if "items" in data:
        items = data["items"]
        for item in items:
            if "statistics" in item:
                statistics = item["statistics"]
                statistics_list.append(statistics)
            else:
                print("No 'statistics' key found in one or more 'items'.")
    else:
        print("No 'items' key found in the JSON data.")

    return statistics_list


# Returns the topic details of raw video JSON
def find_topic_details(data):
    # Initialize an empty list to store statistics
    topic_details_list = []

    if "items" in data:
        items = data["items"]
        for item in items:
            if "topicDetails" in item:
                topic_details = item["topicDetails"]
                topic_details_list.append(topic_details)
            else:
                print("No 'topic_details' key found in one or more 'items'.")
    else:
        print("No 'items' key found in the JSON data.")

    return topic_details_list
