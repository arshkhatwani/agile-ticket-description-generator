import logging
from ai_models.claude_v3 import ClaudeV3

logger = logging.getLogger()
logger.setLevel("INFO")

ACCEPTED_TICKET_TYPES = ('story', 'task', 'epic')


class TicketDescriptionGenerator:
    def __init__(self, client):
        self.client = client
        self.model = ClaudeV3(client=client)

    def get_system_role(self):
        role = "You are an agile ticket description generator whose responsibilities is to understand the task mentioned in the prompt and rewrite it following the conventions and you also have to write a definition of done for that task/prompt that is provided to you. You have to return every response in a well formatted markdown, it should just be markdown no need to wrap it with markdown code block. Please avoid using '#' as the main heading and use '##' instead."
        return role

    def get_updated_prompt(self, prompt: str, ticket_type: str, additional_details: bool, template: str):
        if additional_details == True:
            prompt = prompt + "\n" + "Include specific details under headings such as 'What' to describe the objective of each task, and 'Why' to provide rationale or user benefit where applicable."

        if ticket_type in ACCEPTED_TICKET_TYPES:
            prompt = f'Write an agile {ticket_type} description for the following content \n\n' + prompt

        if template:
            prompt = prompt + "\n" + "Return the output in following format:\n" + template

        logger.info('Updated prompt: %s', prompt)

        return prompt

    def generate_description(self, prompt: str, ticket_type: str, additional_details: bool, template: str):
        system_role = self.get_system_role()
        prompt = self.get_updated_prompt(
            prompt, ticket_type, additional_details, template)

        logger.info('Invoking model')
        response = self.model.invoke_model(
            system_role=system_role,
            prompt=prompt
        )
        if response == {}:
            return prompt, ''

        logger.info('Received response successfully')
        completion = response["content"][0]['text']

        return prompt, completion
