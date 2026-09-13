from supabase import Client, create_client
import os
from dotenv import load_dotenv

load_dotenv()
DATABASE_URL = os.getenv("DATABASE_URL")
DATABASE_KEY = os.getenv("DATABASE_KEY")

def add_tag_to_db(tag_info: dict):
    supabase: Client = create_client(DATABASE_URL, DATABASE_KEY)
    try:
        response = supabase.table('goon_tags').update(tag_info).eq('id', '1').execute()
        return response
    except Exception as e:
        print(f"Error adding tag to database: {e}")
        return None

def get_tags_from_db():
    supabase: Client = create_client(DATABASE_URL, DATABASE_KEY)
    try:
        response = supabase.table('goon_tags').select('tag_listing').eq('id', '1').execute()
        return response
    except Exception as e:
        print(f"Error retrieving tags from database: {e}")
        return None