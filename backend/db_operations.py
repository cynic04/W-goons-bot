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

def add_favorites_to_db(favorite_posts: list, userID, favorite_post_ids):
    supabase: Client = create_client(DATABASE_URL, DATABASE_KEY)
    try:
        response = supabase.table('goon_tags').update({"favorite_posts": favorite_posts, "favorite_post_ids": favorite_post_ids}).eq('id', userID).execute()
        return response
    except Exception as e:
        print(f"Error adding favorite: {e}")
        return None

def get_favorite_posts(userID, return_just_ids=False):
    supabase: Client = create_client(DATABASE_URL, DATABASE_KEY)
    try:
        if return_just_ids:
            get_favorite_post_ids = supabase.table('goon_tags').select('favorite_post_ids').eq('id', userID).execute()
            return get_favorite_post_ids.data[0]['favorite_post_ids']
        else:
            get_current_favorite_info = supabase.table('goon_tags').select('favorite_posts').eq('id', userID).execute()
            get_favorite_post_ids = supabase.table('goon_tags').select('favorite_post_ids').eq('id', userID).execute()
            return {
                "favorite_posts": get_current_favorite_info.data[0]['favorite_posts'],
                "favorite_post_ids": get_favorite_post_ids.data[0]['favorite_post_ids']
            }
    
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