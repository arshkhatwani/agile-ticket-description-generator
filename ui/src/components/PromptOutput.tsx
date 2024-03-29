import { useRecoilState } from "recoil";
import { promptLoadingState, promptOutputState } from "../state/atoms/prompt";
import Markdown from "react-markdown";
import Loading from "./Loading/Loading";

export default function PromptOutput() {
    const [output] = useRecoilState(promptOutputState);
    const [loading] = useRecoilState(promptLoadingState);

    if (loading) {
        return <Loading />;
    }

    if (!output) {
        return <></>;
    }

    return (
        <div className="mt-6 w-full flex justify-center ">
            <p className="w-[80%] text-xl py-2 px-3 rounded-lg output-container">
                <Markdown className="prose prose-lg prose-invert">
                    {output}
                </Markdown>
            </p>
        </div>
    );
}
