export default function PromptInput() {
    return (
        <div className="w-full flex justify-center gap-2 my-3">
            <textarea
                className="text-2xl w-5/6 p-3 rounded-lg"
                placeholder="Enter your ticket details"
                rows={1}
            />
            <button className="text-xl bg-blue-500 py-1 px-3 text-white rounded-lg">
                Submit
            </button>
        </div>
    );
}
