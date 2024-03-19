import React, { useRef } from "react";
import useAutoheightTextarea from "../../hooks/useAutoheightTextarea";

interface Props {
    placeholder?: string | undefined;
    value: string | number | readonly string[];
    onChange?: React.ChangeEventHandler<HTMLTextAreaElement> | undefined;
    onKeyDown?: React.KeyboardEventHandler<HTMLTextAreaElement> | undefined;
    rows?: number | undefined;
    className?: string | undefined;
}

export default function Textarea({
    placeholder,
    value,
    onChange,
    onKeyDown,
    rows,
    className,
}: Props) {
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    useAutoheightTextarea(textareaRef.current, value);

    return (
        <textarea
            ref={textareaRef}
            className={
                "text-2xl p-3 rounded-lg default-text-color " +
                (className || "")
            }
            placeholder={placeholder}
            rows={rows}
            value={value}
            onChange={onChange}
            onKeyDown={onKeyDown}
        />
    );
}
