import boto3

class TicketDescriptionGenerator:
    def __init__(self) -> None:
        self.client = boto3.client('bedrock-runtime')
