from utils.constants import ACCEPTED_TICKET_TYPES

class DynamicPrompts(object):
    
    @staticmethod
    def get_ticket_type_prompt(ticket_type: str, prompt: str) -> str:
        if ticket_type in ACCEPTED_TICKET_TYPES:
            return f'Write an agile {ticket_type} description for the following content \n\n' + prompt
        return prompt
    
    
    @staticmethod
    def include_template_prompt(template: str, prompt: str) -> str:
        if template:
            return prompt + "\n" + "Return the output in following format:\n" + template
        return prompt