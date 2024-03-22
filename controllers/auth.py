import os
import requests
from google.oauth2 import id_token
from google.auth.transport import requests as google_requests
import google.auth.transport.requests
from pip._vendor import cachecontrol
from flask import session, abort, request, Blueprint, jsonify

from utils.config import get_google_auth_flow
from sql.auth import get_user_by_email, create_user

auth_bp = Blueprint('auth', __name__)
flow = get_google_auth_flow()

def auth_login():
    authorization_url, state = flow.authorization_url()
    session["state"] = state
    return authorization_url

def auth_callback():
    flow.fetch_token(authorization_response=request.url)
    
    if not session["state"] == request.args["state"]:
        abort(500)  # State does not match!

    token, token_request = _get_session_credentials(flow=flow)
    id_info = _get_id_info(token=token, token_request=token_request)
    sub, name, email, picture = _set_session_value(id_info=id_info)
    _login_or_register_user(email=email, name=name, picture=picture)
    
    return jsonify({
        "is_authenticated": "google_id" in session,
        "name": name,
        "email": email,
        "picture": picture,
        "token": token
    })

def auth_verify_token(token):
    try:
        id_info = id_token.verify_oauth2_token(
            id_token=token,
            request=google_requests.Request(),
            audience=os.environ.get('GOOGLE_CLIENT_ID')
        )

        # Check if the token is valid and matches your client ID
        if id_info['iss'] not in ['accounts.google.com', 'https://accounts.google.com']:
            raise ValueError('Invalid token issuer.')

        return jsonify({"valid_token": True, "user_info": id_info})
    except ValueError as e:
        return jsonify({"valid_token": False, "error": str(e)})

def _get_session_credentials(flow):
    credentials = flow.credentials
    token = credentials.token
    request_session = requests.session()
    cached_session = cachecontrol.CacheControl(request_session)
    token_request = google.auth.transport.requests.Request(session=cached_session)
    return token, token_request

def _get_id_info(token, token_request):
    id_info = id_token.verify_oauth2_token(
        id_token=token,
        request=token_request,
        audience=os.environ.get('GOOGLE_CLIENT_ID')
    )
    return id_info

def _set_session_value(id_info):
    sub, name, email, picture = id_info.get("sub"), id_info.get("name"), id_info.get("email"), id_info.get("picture")
    # set session values
    session["google_id"] = sub
    session["name"] = name
    session["email"] = email
    session["picture"] = picture
    return sub, name, email, picture
    
def _login_or_register_user(email, name, picture):
    user = get_user_by_email(email=email)
    if not user:
        user = create_user(email=email, name=name, image_url=picture)
    return
    