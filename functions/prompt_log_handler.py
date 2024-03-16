import json
import os
import logging
from db.connectors.dynamodb_connector import DynamoDBConnector
from db.prompt_log_manager import PromptLogManager

logger = logging.getLogger()
logger.setLevel("INFO")


def handler(event, context):
    try:
        body = json.loads(event["Records"][0]["body"])
        logger.info('Received message body: %s', body)

        prompt, output = body.get('prompt'), body.get('output')

        if not prompt or not output:
            logger.info(
                'Unable to continue as prompt, output, or both are missing')
            return

        prompt_logs_table = os.environ.get('PROMPT_LOGS_TABLE')

        dynamodb_connector = DynamoDBConnector(prompt_logs_table)
        prompt_log_manager = PromptLogManager(
            dynamodb=dynamodb_connector.dynamodb,
            table=dynamodb_connector.table
        )

        prompt_log_manager.insert_record(prompt, output)
    except Exception as e:
        logger.exception(
            'handler function failed due to exception: %s', str(e))
