# Endpoint expects this structure from the request body when it is received
# Frontend also expects this from the response body when the response is returned

from fastapi import FastAPI, status, HTTPException
from fastapi.responses import RedirectResponse
from fastapi.middleware.cors import CORSMiddleware
from services.favorite_service import add_favorite_service, remove_favorite_service
from services.tag_service import fetch_tags_service, add_tag_service, delete_tag_service
from services.goons_service import fetch_goons_service, temporary_fetch_jane_goons
from services.favorite_service import get_favorites_service
from db_operations import get_favorite_posts
import os
import httpx
import jwt
from dotenv import load_dotenv
from pydantic import BaseModel
import random
# Define the origins that are allowed to make requests to the backend
load_dotenv()  
origins = [
    os.getenv("FRONTEND_LOCALHOST"),
    os.getenv("FRONTEND_PRODUCTION")
]

DATABASE_URL = os.getenv("DATABASE_URL")
DATABASE_KEY = os.getenv("DATABASE_KEY")
GOOGLE_CLIENT_ID = os.getenv("CLIENT_ID")
GOOGLE_CLIENT_SECRET = os.getenv("CLIENT_SECRET")
REDIRECT_URI = "http://localhost:8000/auth/google/callback"
FRONTEND_URL = os.getenv("FRONTEND_LOCALHOST")
JWT_SECRET = os.getenv("JWT_SECRET")


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
# Frontend also expects this from the response body when the response is returned
class TagRequest(BaseModel):
    tag: str
    userID: int

class FavoriteRequest(BaseModel):
    userID: int
    goonInformation: dict

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

# Initial endpoint for Google login - redirects to Google auth page
@app.get("/api/auth/google/login")
def login_with_google():
    google_auth_url = f"https://accounts.google.com/o/oauth2/v2/auth?client_id={GOOGLE_CLIENT_ID}&redirect_uri={REDIRECT_URI}&response_type=code&scope=email"
    return RedirectResponse(google_auth_url)

@app.get("/auth/google/callback")
async def google_callback(code: str):
    # Exchange the code from the above login function for an access token
    async with httpx.AsyncClient() as client:
        token_resp = await client.post(
            "https://oauth2.googleapis.com/token",
            data={
                "code": code,
                "client_id": GOOGLE_CLIENT_ID,
                "client_secret": GOOGLE_CLIENT_SECRET,
                "redirect_uri": REDIRECT_URI,
                "grant_type": "authorization_code"
            }
        )

        token_data = token_resp.json()
        if "access_token" not in token_data:
            return {"message": "Failed to get access token"}

        # Once the access token is received, fetch the user info associated with it
        user_resolution = await client.get(
            "https://www.googleapis.com/oauth2/v2/userinfo",
            headers={"Authorization": f"Bearer {token_data['access_token']}"}
        )
        user_info = user_resolution.json()

        # Construct payload for resulting JWT token
        payload = {
            "sub": user_info['email'],
            "name": user_info.get('name')
        }

        # Redirect back to the app with the token
        app_token = jwt.encode(payload, JWT_SECRET, algorithm="HS256")
        return RedirectResponse(url=f'{FRONTEND_URL}/auth/callback?token={app_token}')

@app.get(
    "/api/get-tags", 
    status_code=status.HTTP_200_OK,
    description="Retrieve all tags stored in the database under a selected user (defaults to 3 for now)",
    response_description="Returns a list of tags.",
    response_model=TagsResponse
)
async def get_tags(userID = 3):
    tags = fetch_tags_service(userID)
    if tags:    
        return {
            "message": "Tags retrieved successfully!",
            "tags": tags
        }
    else:
        return {
            "message": "No tags found in the database.",
            "tags": []
        }

@app.get("/api/get-favorite-post-ids")
async def get_favorites(userID = 3):
    favorite_posts = get_favorites_service(userID, True)
    return {
        "message": "Favorites retrieved",
        "data": favorite_posts
    }

@app.get(
    "/api/get-goons",
    status_code=status.HTTP_200_OK,
    description="Get 30 random R34 posts with a tag/combo of tags from the database.",
    response_description="Returns the JSON formatted response from R34 and the tag(s) that was used to fetch the posts.",
    response_model=GoonsResponse
)
async def get_goons(userID = 3, tag_combo: bool = False):
    # Service structures the response to match the GoonsResponse model
    return fetch_goons_service(userID, tag_combo)

# A test API call just to work on different displays for the frontend
# May or may not be removed in the future
@app.get("/api/get-jane-goons")
async def get_jane_goons():
    return temporary_fetch_jane_goons()

@app.get("/api/get-favorites")
async def get_favorites(userID: int):
    favorite_posts_info = get_favorites_service(userID, False)
    return {
        "message": "Favorites retrieved.",
        "data": favorite_posts_info.get("favorite_posts", [])
    }

@app.post(
    "/api/add-tag",
    status_code=status.HTTP_201_CREATED,
    description="Add a new tag to the database under a selected user (defaults to 3 for now).",
    response_description="Returns a message indicating whether the tag was added successfully.",
    response_model=MessageOnlyResponse
)
async def add_tag(request: TagRequest):
    tag = request.tag
    userID = request.userID
    # Ensure the tag is formatted correctly for R34 API requests
    response = add_tag_service(userID, tag)
    if response == True:
        return {
            "message": "Tags set successfully!",
        }
    else:
        return {
            "message": "Failed to add tag to the database.",
        }

@app.post("/api/add-favorite")
async def add_favorite(request: FavoriteRequest):
    userID = request.userID
    goonToFavorite = request.goonInformation
    goonID = goonToFavorite["id"]
    add_favorite_service(userID, goonToFavorite, goonID)
    return {
        "message": "Favorite added."
    }

@app.delete(
    "/api/delete-tag",
    status_code=status.HTTP_200_OK,
    description="Delete a single tag from the database under a selected user (defaults to 3 for now).",
    response_description="Returns a message indicating whether the tag was deleted successfully + the remaining tags in the database.",
    response_model=MessageWithTagsResponse
)
async def delete_tag(request: TagRequest):
    tag = request.tag
    userID = request.userID
    delete_tag_service(userID, tag)
    tags = fetch_tags_service(userID)
    return {
        "message": f"Tag '{tag}' deleted successfully!",
        "tags": tags
    }

@app.delete("/api/delete-favorite")
async def delete_favorite(request: FavoriteRequest):
    userID = request.userID
    goonID = request.goonInformation["id"]
    remove_favorite_service(userID, goonID)
    return {"message": "Favorite deleted."}
                