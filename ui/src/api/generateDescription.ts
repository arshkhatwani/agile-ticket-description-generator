import axios from "axios";
import { SERVER_URL } from "../constants/serverUrl";

const generateDescription = async (
    prompt: string,
    ticketType: string,
    additionalDetails: boolean,
    template: string
) => {
    let response = "";

    try {
        const res = await axios.post(SERVER_URL + "/generate", {
            prompt,
            ticket_type: ticketType,
            additional_details: additionalDetails,
            template,
        });
        const data = await res.data;
        response = data?.message;
    } catch (err) {
        console.error("Could not generate description due to error:", err);
    }

    return response;
};

export default generateDescription;
