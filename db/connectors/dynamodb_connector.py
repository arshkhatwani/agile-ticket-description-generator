import boto3
import logging

logger = logging.getLogger()
logger.setLevel("INFO")


class DynamoDBConnector:
    def __init__(self, table_name):
        logger.info('Connecting to DB')

        self.dynamodb = boto3.resource('dynamodb')
        self.table = self.dynamodb.Table(table_name)

        logger.info('Connected to DB successfully')
