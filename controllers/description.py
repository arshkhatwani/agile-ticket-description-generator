import boto3
import logging
from flask import request, jsonify
from ai_models.claude_v3 import ClaudeV3
from services.ticket_description_generator import TicketDescriptionGenerator
from services.prompt_logs_queue import PromptLogsQueue

logger = logging.getLogger()
logger.setLevel("INFO")


def generate_description(client=boto3.client('bedrock-runtime')):
    prompt = request.json.get('prompt')
    ticket_type = request.json.get('ticket_type', 'story')
    additional_details = request.json.get('additional_details', False)
    template = request.json.get('template', '')

    logger.info('prompt: %s', prompt)
    logger.info('ticket_type: %s', ticket_type)
    logger.info('additional_details: %s', additional_details)
    logger.info('template: %s', template)

    prompt, output = TicketDescriptionGenerator.generate_description(
            model=ClaudeV3(client=client),
            prompt=prompt,
            ticket_type=ticket_type,
            additional_details=additional_details,
            template=template
        )

    prompt_logs_queue = PromptLogsQueue()
    prompt_logs_queue.send_message(prompt, output)

    return jsonify(message=output)
