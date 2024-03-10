import axios from "axios";
import { SERVER_URL } from "../constants";

const generateDescription = async (
    prompt: string,
    ticketType: string,
    additionalDetails: boolean
) => {
    let response = "";

    try {
        const res = await axios.post(SERVER_URL + "/generate", {
            prompt,
            ticket_type: ticketType,
            additional_details: additionalDetails,
        });
        const data = await res.data;
        response = data?.message;
    } catch (err) {
        console.error("Could not generate description due to error:", err);
    }

    return response;
};

export default generateDescription;
