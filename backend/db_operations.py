from supabase import Client, create_client
import os
from dotenv import load_dotenv

load_dotenv()
DATABASE_URL = os.getenv("DATABASE_URL")
DATABASE_KEY = os.getenv("DATABASE_KEY")

def add_tag_to_db(tag_info: dict, userID):
    supabase: Client = create_client(DATABASE_URL, DATABASE_KEY)
    try:
        response = supabase.table('goon_tags').update(tag_info).eq('id', userID).execute()
        return response
    except Exception as e:
        print(f"Error adding tag to database: {e}")
        return None

def add_favorites_to_db(favorite_posts: list, userID):
    supabase: Client = create_client(DATABASE_URL, DATABASE_KEY)
    try:
        response = supabase.table('goon_tags').update({"favorite_posts": favorite_posts}).eq('id', userID).execute()
        return response
    except Exception as e:
        print(f"Error adding favorite: {e}")
        return None

def get_favorite_posts(userID):
    supabase: Client = create_client(DATABASE_URL, DATABASE_KEY)
    try:
        get_current_favorite_info = supabase.table('goon_tags').select('favorite_posts').eq('user_id', userID).execute()
        if get_current_favorite_info.data:
            return get_current_favorite_info
        return None
    
    except Exception as e:
        print(f"Error getting favorites: {e}")
        return None

def get_tags_from_db(userID):
    supabase: Client = create_client(DATABASE_URL, DATABASE_KEY)
    try:
        response = supabase.table('goon_tags').select('tag_listing').eq('id', userID).execute()
        return response
    except Exception as e:
        print(f"Error retrieving tags from database: {e}")
        return None