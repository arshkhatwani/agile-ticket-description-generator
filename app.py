from flask import Flask, jsonify, make_response, request
from flask_cors import cross_origin
from controllers.description import generate_description

app = Flask(__name__)

@app.route("/generate", methods=['POST'])
@cross_origin()
def generate():
    return generate_description()

@app.errorhandler(404)
def resource_not_found(e):
    return make_response(jsonify(error='Not found!'), 404)
