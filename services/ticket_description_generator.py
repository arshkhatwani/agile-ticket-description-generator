import logging
import boto3
from typing import Tuple, Any
from ai_models.claude_v3 import ClaudeV3
from utils.misc_constants import TEXT_CONTENT_INDEX, EMPTY_RESPONSE
from utils.static_prompts import StaticPrompts
from utils.dynamic_prompts import DynamicPrompts

logger = logging.getLogger()
logger.setLevel(logging.INFO)

class TicketDescriptionGenerator:
    def __init__(self, client):
        self.client = client
        self.model = ClaudeV3(client=client)

    @staticmethod
    def get_system_role() -> str:
        role = StaticPrompts.SYSTEM_ROLE_PROMPT.value
        return role


    @staticmethod
    def get_updated_prompt(prompt: str, ticket_type: str, additional_details: bool, template: str) -> str:
        if additional_details:
            prompt += StaticPrompts.ADDITIONAL_DETAILS_PROMPT.value
        
        prompt = DynamicPrompts.get_ticket_type_prompt(ticket_type=ticket_type, prompt=prompt)
        prompt = DynamicPrompts.include_template_prompt(template=template, prompt=prompt)

        logger.info(f'Updated prompt: {prompt}')

        return prompt
    
    
    @staticmethod
    def invoke_model(system_role: str, prompt: str):
        try:
            logger.info('Invoking model')
            
            client = boto3.client('bedrock-runtime')
            model = ClaudeV3(client=client)
            
            response = model.invoke_model(
                system_role=system_role,
                prompt=prompt
            )
            if response == EMPTY_RESPONSE:
                return prompt, ''
            logger.info('Received response successfully')
            completion = response["content"][TEXT_CONTENT_INDEX]['text']
            return prompt, completion
        except Exception as e:
            logger.error('Error while generating description : %s', e)
            return prompt, ''


    @staticmethod
    def generate_description(prompt: str, ticket_type: str, additional_details: bool, template: str) -> Tuple[str, str]:
        system_role = TicketDescriptionGenerator.get_system_role()
        prompt = TicketDescriptionGenerator.get_updated_prompt(prompt, ticket_type, additional_details, template)
        prompt, completion = TicketDescriptionGenerator.invoke_model(system_role=system_role, prompt=prompt)
        return prompt, completion