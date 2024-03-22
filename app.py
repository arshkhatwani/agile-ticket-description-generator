import os
from flask import Flask, jsonify, make_response
from flask_cors import cross_origin
from controllers.description import generate_description
from routes.auth import auth_bp

app = Flask(__name__)
app.secret_key = os.environ.get('SECRET_KEY')
app.register_blueprint(auth_bp)

@app.route("/generate", methods=['POST'])
@cross_origin()
def generate():
    return generate_description()

@app.errorhandler(404)
def resource_not_found(e):
    return make_response(jsonify(error='Not found!'), 404)
