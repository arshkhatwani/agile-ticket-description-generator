from flask import Flask, jsonify, make_response, request
import boto3
import logging
from services.ticket_description_generator import TicketDescriptionGenerator

logger = logging.getLogger()
logger.setLevel("INFO")

app = Flask(__name__)
client = boto3.client('bedrock-runtime')


@app.route("/generate", methods=['POST'])
def generate_description():
    prompt = request.json.get('prompt')
    ticket_type = request.json.get('ticket_type', 'story')
    additional_details = request.json.get('additional_details', False)

    logger.info('prompt: %s', prompt)
    logger.info('ticket_type: %s', ticket_type)
    logger.info('additional_details: %s', additional_details)

    ticket_description_generator = TicketDescriptionGenerator(client)
    response = ticket_description_generator.generate_description(
        prompt, ticket_type, additional_details)

    return jsonify(message=response)


@app.errorhandler(404)
def resource_not_found(e):
    return make_response(jsonify(error='Not found!'), 404)
