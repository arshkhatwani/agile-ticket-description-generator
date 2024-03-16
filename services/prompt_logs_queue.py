import os
import boto3
import json
import logging

logger = logging.getLogger()
logger.setLevel("INFO")

PROMPT_LOGS_QUEUE_URL = os.environ.get('PROMPT_LOGS_QUEUE_URL')


class PromptLogsQueue:
    def __init__(self):
        self.sqs = boto3.client('sqs')

    def send_message(self, prompt, output):
        message_body = json.dumps({"prompt": prompt, "output": output})

        logger.info('Sending message (%s) to Prompt Logs Queue', message_body)
        response = self.sqs.send_message(
            QueueUrl=PROMPT_LOGS_QUEUE_URL,
            MessageBody=message_body
        )
        logger.info('Sent message successfully')

        return response
