import { useRecoilState } from "recoil";
import { promptInputState, promptOutputState } from "../state/atoms/prompt";
import generateDescription from "../api/generateDescription";

export default function PromptInput() {
    const [input, setInput] = useRecoilState(promptInputState);
    const [, setOutput] = useRecoilState(promptOutputState);

    const onSubmit = async () => {
        const description = await generateDescription(input);
        if (!description) {
            alert("Could not generate description, please try later");
            return;
        }
        setOutput(description);
    };

    return (
        <div className="w-full flex justify-center gap-2 my-3">
            <textarea
                className="text-2xl w-5/6 p-3 rounded-lg"
                placeholder="Enter your ticket details"
                rows={1}
                value={input}
                onChange={(e) => setInput(e.target.value)}
            />
            <button
                className="text-xl bg-blue-500 py-1 px-3 text-white rounded-lg"
                onClick={onSubmit}>
                Submit
            </button>
        </div>
    );
}
