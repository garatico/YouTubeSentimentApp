import json


def return_video_data(file_path, data_function):
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
