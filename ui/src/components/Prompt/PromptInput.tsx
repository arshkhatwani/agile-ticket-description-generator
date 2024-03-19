import { useRecoilState } from "recoil";
import {
    additionalDetailsState,
    includeTemplateState,
    promptInputState,
    promptLoadingState,
    promptOutputState,
    templateInputState,
    ticketTypeState,
} from "../../state/atoms/prompt";
import generateDescription from "../../api/generateDescription";
import TicketType from "./TicketType";
import AdditonalDetails from "./AdditonalDetails";
import PromptInputTooltip from "./PromptInputTooltip";
import iconPaths from "../../constants/iconPaths";
import SubmitBtnLoading from "../Loading/SubmitBtnLoading";
import TemplateInput from "../TicketTemplate/TemplateInput";
import Textarea from "../Inputs/Textarea";

export default function PromptInput() {
    const [input, setInput] = useRecoilState(promptInputState);
    const [, setOutput] = useRecoilState(promptOutputState);
    const [loading, setLoading] = useRecoilState(promptLoadingState);
    const [ticketType] = useRecoilState(ticketTypeState);
    const [additionalDetails] = useRecoilState(additionalDetailsState);
    const [includeTemplate] = useRecoilState(includeTemplateState);
    const [templateInput] = useRecoilState(templateInputState);

    const onSubmit = async () => {
        if (input.trim() === "") return;
        if (loading) return;

        setLoading(true);

        const template = includeTemplate ? templateInput : "";
        const description = await generateDescription(
            input,
            ticketType,
            additionalDetails,
            template
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
            <div className="w-[80%] flex gap-2 input-container rounded-lg p-2">
                <Textarea
                    className="flex-1"
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
                        "submit-btn-bg rounded-full flex justify-center items-center size-12 my-auto" +
                        (loading ? " cursor-not-allowed" : "")
                    }
                    disabled={loading}
                    onClick={onSubmit}>
                    {loading ? (
                        <SubmitBtnLoading />
                    ) : (
                        <img src={iconPaths.SEND_ICON} className="size-6" />
                    )}
                </button>
            </div>
            <PromptInputTooltip />

            <TicketType />
            <AdditonalDetails />
            <TemplateInput />
        </div>
    );
}
