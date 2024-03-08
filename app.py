from flask import Flask, jsonify, make_response, request
import boto3
from services.ticket_description_generator import TicketDescriptionGenerator

app = Flask(__name__)
client = boto3.client('bedrock-runtime')


@app.route("/generate")
def hello_from_root():
    prompt = request.args.get('prompt')

    ticket_description_generator = TicketDescriptionGenerator(client)
    response = ticket_description_generator.generate_description(prompt)

    return jsonify(message=response)


@app.errorhandler(404)
def resource_not_found(e):
    return make_response(jsonify(error='Not found!'), 404)
