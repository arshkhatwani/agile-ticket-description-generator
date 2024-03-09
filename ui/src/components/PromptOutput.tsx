import { useRecoilState } from "recoil";
import { promptOutputState } from "../state/atoms/prompt";
import Markdown from "react-markdown";

export default function PromptOutput() {
    const [output] = useRecoilState(promptOutputState);

    return (
        <div className="mt-6 w-full flex justify-center ">
            <p className="w-[80%] text-xl p-2 bg-gray-700 rounded-lg">
                <Markdown className="prose prose-lg prose-invert">
                    {output}
                </Markdown>
            </p>
        </div>
    );
}
