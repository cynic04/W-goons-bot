import requests, json
from os import getenv
from dotenv import load_dotenv
import xmltodict
from time import sleep

load_dotenv()
API_URL = getenv("API_LINK_TAGS_R34")
pid_less_than_limit = False
pid = 2000

# # Regular request testing
# response = requests.get(API_URL + f"&limit=1000&order=count&direction=desc")
# data_xml = xmltodict.parse(response.text, attr_prefix="")
# print(json.dumps(data_xml, indent=4))

# Iterates through the top 40,020 tags in the r34 database
# One PID = 20 tags - limit API to return only 20 posts, and increment
while not pid_less_than_limit:
    print(f"==== Fetching tags, currently on PID {pid} =====")
    response = requests.get(API_URL + f"&pid={pid}&limit=20&order=count&direction=desc")
    data_xml = xmltodict.parse(response.text, attr_prefix="")
    # Handle tags not being returned by the API
    find_tags_field = data_xml.get("tags", {})
    if "tag" not in find_tags_field:
        print("Error occurred potentially")
        print(json.dumps(data_xml, indent=4))
        pid_less_than_limit = True
    
    # Intention: Stops after 2000 PIDs (which corresponds to 40,000 tags)
    # Increment actually hits 2001, so 40020 tags in total
    elif pid > 4000:
        pid_less_than_limit = True
    else:
        # Write tags to a file
        with open("backend/tags_2.json", "a") as file:
            file.write(json.dumps(data_xml["tags"]["tag"], indent=4) + "\n")
    # To avoid API rate limiting
    pid += 1
    sleep(3)

