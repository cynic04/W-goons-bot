# FastAPI backend
# Will be used to handle API requests from the frontend and interact with the database

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import os
from dotenv import load_dotenv
from supabase import create_client, Client
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

@app.get("/")
async def root():
    return {
        "message": "THESE ARE THE GOONS, AND THEY ARE HERE TO FUCKING STAYYYYYY!!!"
    }

# Supabase test endpoint to check if the database connection is working
# DOCS: https://supabase.com/docs/reference/python/introduction
@app.get("/api/test")
async def test_endpoint():
    supabase: Client = create_client(DATABASE_URL, DATABASE_KEY)
    db_response = supabase.table("goon_tags").select("*").execute()
    user_info = supabase.table("goon_users").select("*").eq("id", "1").execute()
    return {
        "message": "Test endpoint reached successfully!",
        "db_response": db_response.data,
        "user_info": user_info.data
    }

@app.post("/api/add_tag")
async def add_tag(tag: str = None):
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
            