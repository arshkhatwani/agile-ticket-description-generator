import { useRecoilState } from "recoil";
import { promptOutputState } from "../state/atoms/prompt";
import Markdown from "react-markdown";

export default function PromptOutput() {
    const [output] = useRecoilState(promptOutputState);

    return (
        <div className="mt-6 w-full flex justify-center">
            <p className="w-5/6 text-xl">
                <Markdown>{output}</Markdown>
            </p>
        </div>
    );
}
