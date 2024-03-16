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

        response = self.sqs.send_message(
            QueueUrl=PROMPT_LOGS_QUEUE_URL,
            MessageBody=message_body
        )
        return response
