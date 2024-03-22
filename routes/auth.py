from flask_cors import cross_origin
from flask import session, abort, redirect, request, Blueprint, render_template, jsonify

from controllers.auth import auth_login, auth_callback, auth_verify_token

auth_bp = Blueprint('auth', __name__)

@auth_bp.route("/login")
@cross_origin()
def login():
    authorization_url = auth_login()
    return redirect(authorization_url)

@auth_bp.route("/callback")
@cross_origin()
def callback():
    is_authenticated, name, email, picture, token = auth_callback()
    return render_template('logged_in.html', is_authenticated=is_authenticated, name=name, 
                           email=email, picture=picture, token=token)

@auth_bp.route("/verify_token", methods=["POST"])
@cross_origin()
def verify_token():
    token = request.json.get("token")
    return auth_verify_token(token=token)

