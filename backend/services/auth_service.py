from fastapi.responses import RedirectResponse
import jwt

async def first_time_login(code, client, GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, REDIRECT_URI, JWT_SECRET, FRONTEND_URL, IS_PROD):
    # Exchange the code from the above login function for an access token
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
        "sub": user_info['email']
    }

    # Redirect back to the app with the token
    app_token = jwt.encode(payload, JWT_SECRET, algorithm="HS256")
    response = RedirectResponse(url=f'{FRONTEND_URL}')
    # HttpOnly cookie authentication
    response.set_cookie(
        key="access_token",
        value=app_token,
        httponly=True,
        secure=IS_PROD,
        samesite='None',
        max_age=3600
    )
    return response