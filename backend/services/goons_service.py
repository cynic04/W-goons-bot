from services.tag_service import fetch_tags_service
import os
import requests
import random
import json

API_URL = os.getenv("API_LINK_POSTS_R34")

def fetch_goons_service(userID, tag_combo=False):
    tags = fetch_tags_service(userID)
    if tags:
        if tag_combo and len(tags) > 1:
            num_tags_to_combo = random.randint(2, len(tags))
            random_tag = " ".join(random.sample(tags, num_tags_to_combo))
        else:
            random_tag = random.choice(tags)
        r34_response = requests.get(API_URL + f"&limit=30&tags={random_tag} -ai_generated -video sort:random")
        data_json = json.loads(r34_response.text) if r34_response.text else []
        random_tag = random_tag.split(" ")
        if len(data_json) <= 0:
            return {
                "message": "No goons found.",
                "tags": random_tag,
                "data": []
            }
        else:
            index = 0
            for item in data_json:
                new_tag_info_list = []
                tag_info = item["tag_info"]
                # For each tag in the post, check it against the stored tags
                # If the tag is the same as the stored tag, don't append it to the newly created list - otherwise, append it
                # TODO: Inefficient(?) solution
                # Might be better to not include the tag on the frontend to increase backend performance if it takes a hit
                for tag in tag_info:
                    if tag["tag"] not in random_tag:
                        new_tag_info_list.append(tag)
                data_json[index]["tag_info"] = new_tag_info_list
                index += 1
            return {
                "message": f"Goons with tag {random_tag} retrieved successfully!",
                "tags": random_tag,
                "data": data_json
            }
    # If no tags are found in the database, return this reponse
    if not tags:
        return {
        "message": "No goons found.",
        "tags": [],
        "data": []
    }

def temporary_fetch_jane_goons():
    r34_response = requests.get(API_URL + "&limit=50&tags=jane_doe_(zenless_zone_zero) -ai_generated -video sort:random")
    data_json = json.loads(r34_response.text)
    return {
        "message": "Jane goons retrieved.",
        "tags": ["jane_doe_(zenless_zone_zero)"],
        "data": data_json
    }
    



        

