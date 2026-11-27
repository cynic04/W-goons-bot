from db_operations import get_tags_from_db, add_tag_to_db

def fetch_tags_service(userID):
    get_tags = get_tags_from_db(userID)
    if get_tags.data:
        return get_tags.data[0]["tag_listing"]["tags"]
    return []

def add_tag_service(userID, tag):
    tags = fetch_tags_service(userID)
    if tag not in tags:
        tags.append(tag)
        add_tag_to_db({"tag_listing": {"tags": tags}}, userID)
    return True

def delete_tag_service(userID, tag):
    tags = fetch_tags_service(userID)
    if tag in tags:
        tags.remove(tag)
        add_tag_to_db({"tag_listing": {"tags": tags}}, userID)
    return True

