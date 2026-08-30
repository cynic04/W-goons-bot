# FastAPI backend
# Will be used to handle API requests from the frontend and interact with the database

from fastapi import FastAPI
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
    return {
        "message": "THESE ARE THE GOONS, AND THEY ARE HERE TO FUCKING STAYYYYYY!!!"
    }

# Supabase test endpoint to check if the database connection is working
# DOCS: https://supabase.com/docs/reference/python/introduction
@app.post("/api/add-tag")
async def add_tag(request: TagRequest):
    tag = request.tag
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

@app.get("/api/get-goons")
async def get_goons():
    supabase: Client = create_client(DATABASE_URL, DATABASE_KEY)
    get_tags = supabase.table("goon_tags").select("tag_listing").eq("id", "1").execute()
    # If data is returned from the database, get the list of tags and return a random tag to the frontend
    if get_tags.data:
       tags = get_tags.data[0]["tag_listing"]["tags"]
       if tags:
            random_tag = random.choice(tags)
            r34_response = requests.get(os.getenv("API_LINK_POSTS_R34") + f"&limit=10&tags={random_tag}")
            data_json = xmltodict.parse(r34_response.text)
            return {
                "message": "Images retrieved successfully!",
                "data": data_json
            }
       
    return {
        "message": "No tags found in the database.",
        "tags": []
    }
            