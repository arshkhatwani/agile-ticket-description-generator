interface Props {
    result: string;
}

export default function PromptOutput({ result }: Props) {
    return (
        <div className="mt-6 w-full flex justify-center">
            <p className="w-5/6 text-xl">{result}</p>
        </div>
    );
}
