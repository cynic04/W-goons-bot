# FastAPI backend
# Will be used to handle API requests from the frontend and interact with the database

from fastapi import FastAPI, status
from fastapi.middleware.cors import CORSMiddleware
from db_operations import get_tags_from_db, add_tag_to_db
import os
from dotenv import load_dotenv
from pydantic import BaseModel
import random
import json
import xmltodict
import requests
# Define the origins that are allowed to make requests to the backend
load_dotenv()  
origins = [
    os.getenv("FRONTEND_LOCALHOST"),
    os.getenv("FRONTEND_PRODUCTION")
]

DATABASE_URL = os.getenv("DATABASE_URL")
DATABASE_KEY = os.getenv("DATABASE_KEY")

# Initialize FastAPI app, provide a description for API docs reasons
app = FastAPI(
    title="W-goons API",
    description="API for managing and retrieving R34 goons and tags",
    version="1.0.0"
)

# Add CORS middleware to allow requests from the frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Request body model for adding a tag
# Endpoint expects this structure from the request body when it is received
class TagRequest(BaseModel):
    tag: str

class MessageOnlyResponse(BaseModel):
    message: str

class TagsResponse(BaseModel):
    message: str
    tags: list

class GoonsResponse(BaseModel):
    message: str
    tags: list
    data: dict | list
    
class MessageWithTagsResponse(BaseModel):
    message: str
    tags: list

@app.get(
    "/",
    status_code=status.HTTP_200_OK,
    description="Root endpoint, acts as a visual health check.",
    response_description="Returns a random quote from the server.",
    response_model=MessageOnlyResponse
)
async def root():
    quotes_list = [
        "yeah... I got nothin.",
        "add 'ass' as a tag, flawless results.",
        "femboys, anyone?",
        "Jane Doe is peak goons and you're lying if you disagree.",
        "BOOBS!",
        "I'm shitting bricks rn gng"
    ]
    return {
        "message": random.choice(quotes_list)
    }

@app.get(
    "/api/get-tags", 
    status_code=status.HTTP_200_OK,
    description="Retrieve all tags stored in the database under the global user.",
    response_description="Returns a list of tags.",
    response_model=TagsResponse
)
async def get_tags():
    get_tags = get_tags_from_db()
    if get_tags.data:
        tags = get_tags.data[0]["tag_listing"]["tags"]
        return {
            "message": "Tags retrieved successfully!",
            "tags": tags
        }
    else:
        return {
            "message": "No tags found in the database.",
            "tags": []
        }

@app.get(
    "/api/get-goons",
    status_code=status.HTTP_200_OK,
    description="Get 15 random R34 posts with a tag/combo of tags from the database.",
    response_description="Returns the JSON formatted response from R34 and the tag(s) that was used to fetch the posts.",
    response_model=GoonsResponse
)
async def get_goons(tag_combo: bool = False):
    get_tags = get_tags_from_db()
    # If data is returned from the database, get the list of tags
    if get_tags.data:
        tags = get_tags.data[0]["tag_listing"]["tags"]
        # Check the tag_combo flag - if false, return one random tag
        # If true, check to make sure there are at least 2 tags, and then determine how many of those tags to combo
        if tags:
            if tag_combo and len(tags) > 1:
                num_tags_to_combo = random.randint(2, len(tags))
                random_tag = " ".join(random.sample(tags, num_tags_to_combo))
            else:
                random_tag = random.choice(tags)

            r34_response = requests.get(os.getenv("API_LINK_POSTS_R34") + f"&limit=15&tags={random_tag} -ai_generated -video sort:random")
            data_json = xmltodict.parse(r34_response.text)
            random_tag = random_tag.split(" ")
            if data_json["posts"]["@count"] == "0":
                return {
                    "message": "No goons found.",
                    "tags": random_tag,
                    "data": []
                }
            else:
                return {
                    "message": f"Goons with tag {random_tag} retrieved successfully!",
                    "tags": random_tag,
                    "data": data_json
                }
        # If no tags are found in the database, return this reponse
        else:
            return {
                "message": "No goons found.",
                "tags": [],
                "data": []
            }

@app.post(
    "/api/add-tag",
    status_code=status.HTTP_201_CREATED,
    description="Add a new tag to the database under the global user.",
    response_description="Returns a message indicating whether the tag was added successfully.",
    response_model=MessageOnlyResponse
)
async def add_tag(request: TagRequest):
    tag = request.tag
    # Ensure the tag is formatted correctly for R34 API requests
    tag = tag.replace(" ", "_")
    get_tags = get_tags_from_db()
    if get_tags.data:
        # get the listing of tags from this row, append the new tag, and update the database
        tags = get_tags.data[0]["tag_listing"]["tags"]
        tags.append(tag)
        add_tag_to_db({"tag_listing": {"tags": tags}})
        return {
            "message": "Tags set successfully!",
        }
    else:
        return {
            "message": "Failed to add tag to the database.",
        }

@app.delete(
    "/api/delete-tag",
    status_code=status.HTTP_200_OK,
    description="Delete a single tag from the database under the global user.",
    response_description="Returns a message indicating whether the tag was deleted successfully + the remaining tags in the database.",
    response_model=MessageWithTagsResponse
)
async def delete_tag(request: TagRequest):
    tag = request.tag
    get_tags = get_tags_from_db()
    tags = get_tags.data[0]["tag_listing"]["tags"]
    tags.remove(tag)
    add_tag_to_db({"tag_listing": {"tags": tags}})
    return {
        "message": f"Tag '{tag}' deleted successfully!",
        "tags": tags
    }
                