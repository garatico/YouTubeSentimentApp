import json
import os

print(os.getcwd())

file_path = "./../data/raw/comment-threads/bxIF9X9k2IE.json"

try:
    with open(file_path, "r", encoding="utf-8") as json_file:
        data = json.load(json_file)
        
        item = data.get("items", [{}])[0]
        comment_thread_id = item.get("id")
        
        snippet = item.get("snippet", {})
        channelId = snippet.get("channelId")
        totalReplyCount = snippet.get("totalReplyCount")
        
        topLevelComment = snippet.get("topLevelComment", {})
        tlcSnippet = topLevelComment.get("snippet", {})
        
        textDisplay = tlcSnippet.get("textDisplay")
        textOriginal = tlcSnippet.get("textOriginal")
        publishedAt = tlcSnippet.get("publishedAt")
        updatedAt = tlcSnippet.get("updatedAt")
        
        # Create a dictionary with the retrieved values
        result_data = {
            "comment_thread_id": comment_thread_id,
            "channelId": channelId,
            "totalReplyCount": totalReplyCount,
            "textDisplay": textDisplay,
            "textOriginal": textOriginal,
            "publishedAt": publishedAt,
            "updatedAt": updatedAt
            # parentId = Only for replies to comment
            # likeCount = 
            # canReply = 
            # isPublic = 
            # authorDisplayName = 
            # authorChannelId = 
            # videoId = 
        }

        # Convert the dictionary to a JSON string and print it
        result_json = json.dumps(result_data, indent=4)
        print(result_json)
        
except FileNotFoundError:
    print(f"File not found: {file_path}")
except json.JSONDecodeError as e:
    print(f"Error decoding JSON: {str(e)}")
except Exception as e:
    print(f"An error occurred: {str(e)}")


