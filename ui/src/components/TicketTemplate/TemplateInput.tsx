import ToggleBtn from "../Buttons/ToggleBtn";
import { useRecoilState } from "recoil";
import {
    includeTemplateState,
    templateInputState,
} from "../../state/atoms/prompt";
import Textarea from "../Inputs/Textarea";

export default function TemplateInput() {
    const [includeTemplate, setIncludeTemplate] =
        useRecoilState(includeTemplateState);
    const [templateInput, setTemplateInput] =
        useRecoilState(templateInputState);

    return (
        <div className="my-2 w-[80%] flex flex-col gap-5">
            <div>
                <ToggleBtn
                    value={true}
                    current={includeTemplate}
                    label="Include description format / template"
                    onClick={() => setIncludeTemplate((prev) => !prev)}
                />
            </div>

            {includeTemplate ? (
                <Textarea
                    placeholder="Please enter the expected format/template for the ticket description"
                    rows={3}
                    value={templateInput}
                    onChange={(e) => setTemplateInput(e.target.value)}
                />
            ) : (
                <></>
            )}
        </div>
    );
}
