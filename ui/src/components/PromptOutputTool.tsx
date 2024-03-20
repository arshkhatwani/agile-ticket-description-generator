import { useState } from 'react';
import { useRecoilState } from 'recoil';
import { promptLoadingState, promptOutputState } from '../state/atoms/prompt';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCopy, faCheck } from '@fortawesome/free-solid-svg-icons';

export default function PromptOutputTool() {
    const [output] = useRecoilState(promptOutputState);
    const [loading] = useRecoilState(promptLoadingState);
    const [copied, setCopied] = useState(false);

    const copyTextToClipboard = () => {
        const textToCopy = output || '';
        navigator.clipboard.writeText(textToCopy).then(() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 3000); // Reset copied state after 3 seconds
        }).catch((error) => {
            console.error('Error copying text: ', error);
            alert('Error copying text');
        });
    };

    if (loading || !output) {
        return <></>;
    }

    return (
        <div className="mt-6 w-full flex justify-center ">
            <div className="w-[80%]">
                <button className={"text-white border border-white px-4 py-2 text-lg rounded-lg mr-4" +
                    (copied && "font-semibold border-2 enabled-toggle-btn")} onClick={copyTextToClipboard}>
                    <FontAwesomeIcon icon={copied ? faCheck : faCopy} className="mr-2" />
                    {copied ? 'Copied!' : 'Copy Text'}
                </button>
            </div>
        </div>
    );
}
