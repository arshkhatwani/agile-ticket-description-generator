import { useRecoilState } from "recoil";
import {
    additionalDetailsState,
    promptInputState,
    promptLoadingState,
    promptOutputState,
    ticketTypeState,
} from "../state/atoms/prompt";
import generateDescription from "../api/generateDescription";
import TicketType from "./TicketType";
import AdditonalDetails from "./AdditonalDetails";
import PromptInputTooltip from "./PromptInputTooltip";

export default function PromptInput() {
    const [input, setInput] = useRecoilState(promptInputState);
    const [, setOutput] = useRecoilState(promptOutputState);
    const [loading, setLoading] = useRecoilState(promptLoadingState);
    const [ticketType] = useRecoilState(ticketTypeState);
    const [additionalDetails] = useRecoilState(additionalDetailsState);

    const onSubmit = async () => {
        if (loading) return;

        setLoading(true);
        const description = await generateDescription(
            input,
            ticketType,
            additionalDetails
        );
        if (!description) {
            alert("Could not generate description, please try later");
            return;
        }
        setOutput(description);
        setLoading(false);
    };

    return (
        <div className="w-full flex flex-col items-center my-3">
            <div className="w-[80%] flex gap-2">
                <textarea
                    className="text-2xl flex-1 p-3 rounded-lg default-text-color"
                    placeholder="Enter your ticket details"
                    rows={1}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === "Enter" && !e.shiftKey) {
                            e.preventDefault();
                            onSubmit();
                        }
                    }}
                />
                <button
                    className={
                        "text-xl py-1 px-3 default-text-color rounded-lg" +
                        (loading ? " cursor-not-allowed" : "")
                    }
                    disabled={loading}
                    onClick={onSubmit}>
                    Submit
                </button>
            </div>
            <PromptInputTooltip />

            <TicketType />
            <AdditonalDetails />
        </div>
    );
}
