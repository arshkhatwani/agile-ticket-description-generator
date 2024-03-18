import React from "react";

interface Props {
    placeholder?: string | undefined;
    value: string | number | readonly string[];
    onChange?: React.ChangeEventHandler<HTMLTextAreaElement> | undefined;
    onKeyDown?: React.KeyboardEventHandler<HTMLTextAreaElement> | undefined;
    rows?: number | undefined;
}

export default function Textarea({
    placeholder,
    value,
    onChange,
    onKeyDown,
    rows,
}: Props) {
    return (
        <textarea
            className="flex-1 text-2xl p-3 rounded-lg default-text-color"
            placeholder={placeholder}
            rows={rows}
            value={value}
            onChange={onChange}
            onKeyDown={onKeyDown}
        />
    );
}
