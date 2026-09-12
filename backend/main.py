# FastAPI backend
# Will be used to handle API requests from the frontend and interact with the database

from fastapi import FastAPI, status
from fastapi.middleware.cors import CORSMiddleware
import os
from dotenv import load_dotenv
from supabase import create_client, Client
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

app = FastAPI()

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

@app.get("/")
async def root():
    quotes_list = [
        "yeah... I got nothin.",
        "add 'ass' as a tag, flawless results.",
        "femboys, anyone?",
        "Jane Doe is peak goons and you're lying if you disagree.",
        "BOOBS!",
        "the GoonsBot will get u right watch this."
    ]
    return {
        "message": random.choice(quotes_list)
    }

# Supabase test endpoint to check if the database connection is working
# DOCS: https://supabase.com/docs/reference/python/introduction
@app.post("/api/add-tag", status_code=status.HTTP_201_CREATED)
async def add_tag(request: TagRequest):
    tag = request.tag
    # Ensure the tag is formatted correctly for R34 API requests
    tag = tag.replace(" ", "_")
    supabase: Client = create_client(DATABASE_URL, DATABASE_KEY)
    get_tags = supabase.table("goon_tags").select("tag_listing").eq("id", "1").execute()
    if get_tags.data:
        # get the listing of tags from this row and append it
        tags = get_tags.data[0]["tag_listing"]["tags"]
        # If there's a tag provided by the query params, append it to the list of tags and update the database
        if tag:
            tags.append(tag)
            supabase.table("goon_tags").update({"tag_listing": {"tags": tags}}).eq("id", "1").execute()
            return {
                "message": "Tags set successfully!",
            }
    # If no tag is provided, return an error message
    return {
        "message": "No tag provided.",
    }

# Get 10 recently posted R34 posts with a random tag from the database
# Returns the JSON formatted response from R34 and the tag that was used to fetch the posts
@app.get("/api/get-goons", status_code=status.HTTP_200_OK)
async def get_goons():
    supabase: Client = create_client(DATABASE_URL, DATABASE_KEY)
    get_tags = supabase.table("goon_tags").select("tag_listing").eq("id", "1").execute()
    # If data is returned from the database, get the list of tags
    if get_tags.data:
       tags = get_tags.data[0]["tag_listing"]["tags"]
       # If there are tags in the list, choose a random tag and make a request to the Rule34 API to get posts with that tag
       if tags:
            random_tag = random.choice(tags)
            r34_response = requests.get(os.getenv("API_LINK_POSTS_R34") + f"&limit=10&tags={random_tag} -ai_generated sort:random ")
            data_json = xmltodict.parse(r34_response.text)

            return {
                "message": f"Goons with tag {random_tag} retrieved successfully!",
                "tags": random_tag,
                "data": data_json
            }
       
    return {
        "message": "No goons found.",
        "tags": [],
        "data": []
    }

# Returns all tags stored in the database under our global user
@app.get("/api/get-tags", status_code=status.HTTP_200_OK)
async def get_tags():
    supabase: Client = create_client(DATABASE_URL, DATABASE_KEY)
    get_tags = supabase.table("goon_tags").select("tag_listing").eq("id", "1").execute()
    if get_tags.data:
        tags = get_tags.data[0]["tag_listing"]["tags"]
        return {
            "message": "Tags retrieved successfully!",
            "tags": tags
        }
    return {
        "message": "No tags found in the database.",
        "tags": []
    }
            