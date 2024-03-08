from ai_models.claude_v3 import ClaudeV3


class TicketDescriptionGenerator:
    def __init__(self, client):
        self.client = client
        self.model = ClaudeV3(client=client)

    def get_system_role(self):
        role = 'You are an agile ticket description generator whose responsibilities is to understand the task mentioned in the prompt and rewrite it following the conventions and you also have to write a definition of done for that task/prompt that is provided to you'
        return role

    def generate_description(self, prompt: str):
        system_role = self.get_system_role()

        response = self.model.invoke_model(
            system_role=system_role,
            prompt=prompt
        )
        if response == {}:
            return ''

        completion = response["content"][0]['text']

        return completion
