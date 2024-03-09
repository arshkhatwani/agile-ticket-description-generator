from flask import Flask, jsonify, make_response, request
import boto3
from services.ticket_description_generator import TicketDescriptionGenerator

app = Flask(__name__)
client = boto3.client('bedrock-runtime')


@app.route("/generate", methods=['POST'])
def generate_description():
    prompt = request.json.get('prompt')
    ticket_type = request.json.get('ticket_type', 'story')

    ticket_description_generator = TicketDescriptionGenerator(client)
    response = ticket_description_generator.generate_description(
        prompt, ticket_type)

    return jsonify(message=response)


@app.errorhandler(404)
def resource_not_found(e):
    return make_response(jsonify(error='Not found!'), 404)
