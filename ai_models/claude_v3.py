import json
import logging

logger = logging.getLogger()
logger.setLevel("INFO")


class ClaudeV3:
    def __init__(self, client):
        self.model_id = "anthropic.claude-3-sonnet-20240229-v1:0"
        self.client = client

    def get_body(self, system_role: str, prompt: str):
        body = {
            "anthropic_version": "bedrock-2023-05-31",
            "max_tokens": 1024,
            "system": system_role,
            "messages": [
                {
                    "role": "user",
                    "content": [
                        {
                            "type": "text",
                            "text": prompt
                        }
                    ]
                }
            ]
        }
        return json.dumps(body)

    def invoke_model(self, system_role: str, prompt: str):
        body = self.get_body(system_role, prompt)

        try:
            response = self.client.invoke_model(
                modelId=self.model_id,
                body=body
            )
            response_body = json.loads(response["body"].read())
        except Exception as e:
            logger.exception(
                "Couldn't invoke Anthropic Claude due to exception: %s", str(e))
            response_body = {}

        return response_body
