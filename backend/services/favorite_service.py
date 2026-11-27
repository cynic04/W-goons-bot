from db_operations import get_favorite_posts, add_favorites_to_db

def add_favorite_service(userID, goonToFavorite, goonID):
    favorite_posts_and_ids = get_favorite_posts(userID) or []
    posts = favorite_posts_and_ids["favorite_posts"] if favorite_posts_and_ids else []
    ids = favorite_posts_and_ids["favorite_post_ids"] if favorite_posts_and_ids else []
    posts.append(goonToFavorite)
    ids.append(goonID)
    add_favorites_to_db(posts, userID, ids)

def remove_favorite_service(userID, goonID):
    favorite_posts_and_ids = get_favorite_posts(userID) or []
    posts = favorite_posts_and_ids["favorite_posts"] if favorite_posts_and_ids else []
    ids = favorite_posts_and_ids["favorite_post_ids"] if favorite_posts_and_ids else []
    if goonID in ids:
        ids.remove(goonID)
        posts = [goon for goon in posts if goon["id"] != goonID]
        add_favorites_to_db(posts, userID, ids)

def get_favorites_service(userID, return_just_ids):
    if return_just_ids:
        return get_favorite_posts(userID, True)
    else:
        return get_favorite_posts(userID)