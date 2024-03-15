import json


def handler(event, context):
    body = json.loads(event['Records'][0]['body'])
    print('message body', body)
