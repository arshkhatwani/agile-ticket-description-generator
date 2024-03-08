from flask import Flask, jsonify, make_response

app = Flask(__name__)


@app.route("/generate")
def hello_from_root():
    return jsonify(message='Hello from generate')


@app.errorhandler(404)
def resource_not_found(e):
    return make_response(jsonify(error='Not found!'), 404)
