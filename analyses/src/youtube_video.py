import json


def find_statistics(data):
    # Access the "items" key and print the "statistics" key inside it
    if "items" in data:
        items = data["items"]
        for item in items:
            if "statistics" in item:
                statistics = item["statistics"]
                print(json.dumps(statistics, indent=4))
            else:
                print("No 'statistics' key found in one or more 'items'.")
    else:
        print("No 'items' key found in the JSON data.")
