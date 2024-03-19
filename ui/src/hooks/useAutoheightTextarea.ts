import { useEffect } from "react";

export default function useAutoheightTextarea(
    textareaRef: HTMLTextAreaElement | null,
    value: any
) {
    useEffect(() => {
        if (textareaRef) {
            textareaRef.style.height = "0px";
            const newHeight = textareaRef.scrollHeight;
            textareaRef.style.height = `${newHeight}px`;
        }
    }, [textareaRef, value]);
}
