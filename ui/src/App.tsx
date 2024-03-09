import "./App.css";
import PromptInput from "./components/PromptInput";
import PromptOutput from "./components/PromptOutput";

function App() {
    return (
        <div className="bg-gray-900 min-h-screen flex flex-col">
            <PromptInput />
            <PromptOutput />
        </div>
    );
}

export default App;
