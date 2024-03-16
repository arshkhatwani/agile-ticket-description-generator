import uuid
import logging
from datetime import datetime

logger = logging.getLogger()
logger.setLevel("INFO")


class PromptLogManager:
    def __init__(self, dynamodb, table):
        self.dynamodb = dynamodb
        self.table = table

    def insert_record(self, prompt, output):
        try:
            record = {
                'id': str(uuid.uuid4()),
                'prompt': prompt,
                'output': output,
                'created_at': str(datetime.now().isoformat())
            }
            logger.info('Inserting record: %s', record)

            response = self.table.put_item(Item=record)
            logger.info('Record inserted successfully')

            return response
        except Exception as e:
            logger.exception(
                'Could not insert record due to exception:', str(e))
