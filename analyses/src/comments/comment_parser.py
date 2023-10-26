import json
import os

def list_file_paths(path, ids, filenames):
    file_paths = []

    for video_id, filename in zip(ids, filenames):
        file_path = os.path.join(path, video_id, filename)
        file_paths.append(file_path)

    return file_paths

def list_directories(parent_directory):
    # Create an empty list to store directory names
    directories = []

    # Iterate through the contents of the parent directory
    for item in os.listdir(parent_directory):
        item_path = os.path.join(parent_directory, item)

        # Check if the item is a directory
        if os.path.isdir(item_path):
            directories.append(item)

    return directories

def process_comment(comment):
    snippet = comment["snippet"]
    tlcSnippet = None
    if "topLevelComment" in snippet:
        topLevelComment = snippet["topLevelComment"]
        tlcSnippet = topLevelComment["snippet"]
    else:
        tlcSnippet = snippet

    comment_data = {
        "comment_id": comment["id"],
        # Snippet Items
        "channelId": snippet["channelId"],
        "videoId": snippet["videoId"],
        "canReply": snippet.get("canReply", None),  # Modify canReply her
        "totalReplyCount": snippet.get("totalReplyCount", None),
        "isPublic": snippet.get("isPublic", None),
        # TLC Snippet Items
        "textDisplay": tlcSnippet["textDisplay"],
        "textOriginal": tlcSnippet["textOriginal"],
        "authorDisplayName": tlcSnippet["authorDisplayName"],
        "authorChannelId": tlcSnippet["authorChannelId"]["value"],
        "canRate": tlcSnippet["canRate"],
        "viewerRating": tlcSnippet["viewerRating"],
        "likeCount": tlcSnippet["likeCount"],
        "publishedAt": tlcSnippet["publishedAt"],
        "updatedAt": tlcSnippet["updatedAt"],
        "parentId": comment.get("parentId", None)
    }

    # Check if there are replies and process them recursively
    if "replies" in comment:
        comment_data["replies"] = [process_comment(reply) for reply in comment["replies"]["comments"]]

    return comment_data

def return_comment_thread_data(file_path, index):
    try:
        with open(file_path, "r", encoding="utf-8") as json_file:
            data = json.load(json_file)
            if "items" in data:
                items = data["items"]
                item = items[index]
                topLevelComment = process_comment(item)

                # Initialize an array to store the topLevelComment and its replies
                comment_thread = [topLevelComment]

                # Check if there are replies and add them to the array
                if "replies" in item:
                    comment_thread.extend([process_comment(reply) for reply in item["replies"]["comments"]])
                
                # Remove the "replies" field from the topLevelComment
                topLevelComment.pop("replies", None)

                # Convert the array to a JSON string and print it
                result_json = json.dumps(comment_thread, indent=4)

        return result_json

    except FileNotFoundError:
        print(f"File not found: {file_path}")
    except json.JSONDecodeError as e:
        print(f"Error decoding JSON: {str(e)}")
    except Exception as e:
        print(f"An error occurred: {str(e)}")

def return_comment_thread_data(file_path, index):
    try:
        with open(file_path, "r", encoding="utf-8") as json_file:
            data = json.load(json_file)
            if "items" in data:
                items = data["items"]
                item = items[index]
                topLevelComment = process_comment(item)

                # Initialize an array to store the topLevelComment and its replies
                comment_thread = [topLevelComment]

                # Check if there are replies and add them to the array
                if "replies" in item:
                    comment_thread.extend([process_comment(reply) for reply in item["replies"]["comments"]])
                
                # Remove the "replies" field from the topLevelComment
                topLevelComment.pop("replies", None)

                # Convert the array to a JSON string and return it
                return json.dumps(comment_thread, indent=4)

        return None

    except FileNotFoundError:
        print(f"File not found: {file_path}")
        return None
    except json.JSONDecodeError as e:
        print(f"Error decoding JSON: {str(e)}")
        return None
    except Exception as e:
        print(f"An error occurred: {str(e)}")
        return None

def return_all_comment_thread_data(file_path):
    all_comment_threads = []
    
    try:
        with open(file_path, "r", encoding="utf-8") as json_file:
            data = json.load(json_file)
            if "items" in data:
                items = data["items"]
                
                for index, item in enumerate(items):
                    comment_thread = process_comment(item)
                    if "replies" in item:
                        replies = [process_comment(reply) for reply in item["replies"]["comments"]]
                        comment_thread["replies"] = replies
                        all_comment_threads.extend(replies)
                    
                    # Remove the "replies" field from the comment_thread
                    comment_thread.pop("replies", None)
                    
                    all_comment_threads.append(comment_thread)
        
        return all_comment_threads
    
    except FileNotFoundError:
        print(f"File not found: {file_path}")
        return []
    except json.JSONDecodeError as e:
        print(f"Error decoding JSON: {str(e)}")
        return []
    except Exception as e:
        print(f"An error occurred: {str(e)}")
        return []