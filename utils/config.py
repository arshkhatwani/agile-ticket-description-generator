import os
from pathlib import Path
from google_auth_oauthlib.flow import Flow

def get_google_auth_flow():
    client_secrets_file = os.path.join(Path.cwd(), 'utils', 'client_secret.json')
    flow = Flow.from_client_secrets_file(
        client_secrets_file=client_secrets_file,
        scopes=["https://www.googleapis.com/auth/userinfo.profile", "https://www.googleapis.com/auth/userinfo.email", "openid"],
        redirect_uri="http://127.0.0.1:5000/callback"
    )
    return flow

def get_db_connection_string(database_name=None):
    db_connection_string = os.environ.get('DB_CONNECTION_STRING', None)
    if not db_connection_string:
        raise Exception('DB connection string not found !')
    if database_name:
        db_connection_string += database_name
    return db_connection_string
