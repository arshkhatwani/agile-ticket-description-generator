import { useRecoilState } from "recoil";
import {
    promptInputState,
    promptLoadingState,
    promptOutputState,
} from "../state/atoms/prompt";
import generateDescription from "../api/generateDescription";

export default function PromptInput() {
    const [input, setInput] = useRecoilState(promptInputState);
    const [, setOutput] = useRecoilState(promptOutputState);
    const [, setLoading] = useRecoilState(promptLoadingState);

    const onSubmit = async () => {
        setLoading(true);
        const description = await generateDescription(input);
        if (!description) {
            alert("Could not generate description, please try later");
            return;
        }
        setOutput(description);
        setLoading(false);
    };

    return (
        <div className="w-full flex justify-center my-3">
            <div className="w-[80%] flex gap-2">
                <textarea
                    className="text-2xl flex-1 p-3 rounded-lg text-white"
                    placeholder="Enter your ticket details"
                    rows={1}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                />
                <button
                    className="text-xl py-1 px-3 text-white rounded-lg"
                    onClick={onSubmit}>
                    Submit
                </button>
            </div>
        </div>
    );
}
