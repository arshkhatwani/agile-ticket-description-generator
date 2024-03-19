import React from "react";

interface Props {
    label: string;
    value: any;
    current: any;
    onClick: React.FormEventHandler<HTMLButtonElement>;
}

export default function ToggleBtn({ label, value, current, onClick }: Props) {
    const enabled = value === current ? true : false;

    return (
        <button
            value={value}
            onClick={onClick}
            className={
                "text-white border border-white px-4 py-2 text-lg rounded-lg " +
                (enabled && "font-semibold border-2 enabled-toggle-btn")
            }>
            {label}
        </button>
    );
}
