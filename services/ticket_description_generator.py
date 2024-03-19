import logging
from typing import Tuple, Any
from utils.misc_constants import TEXT_CONTENT_INDEX, EMPTY_RESPONSE
from utils.static_prompts import StaticPrompts
from utils.dynamic_prompts import DynamicPrompts

logger = logging.getLogger()
logger.setLevel(logging.INFO)

class TicketDescriptionGenerator:

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
    def invoke_model(model: Any, system_role: str, prompt: str):
        try:
            logger.info('Invoking model')
            response = model.invoke_model(system_role=system_role, prompt=prompt)
            if response == EMPTY_RESPONSE:
                return prompt, ''
            logger.info('Received response successfully')
            completion = response["content"][TEXT_CONTENT_INDEX]['text']
            prompt, completion
        except Exception as e:
            logger.error('Error while generating description : %s', e)
            return prompt, ''


    @staticmethod
    def generate_description(model: Any, prompt: str, ticket_type: str, additional_details: bool, template: str) -> Tuple[str, str]:
        system_role = TicketDescriptionGenerator.get_system_role()
        prompt = TicketDescriptionGenerator.get_updated_prompt(prompt, ticket_type, additional_details, template)
        response = TicketDescriptionGenerator.invoke_model(model=model, system_role=system_role, prompt=prompt)
        print('------------------>',response)
        return prompt, ''