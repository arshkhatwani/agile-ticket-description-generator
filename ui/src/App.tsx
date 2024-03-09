import PromptInput from "./components/PromptInput";
import PromptOutput from "./components/PromptOutput";

function App() {
    return (
        <div className="min-h-screen flex flex-col">
            <PromptInput />
            <PromptOutput />
        </div>
    );
}

export default App;
