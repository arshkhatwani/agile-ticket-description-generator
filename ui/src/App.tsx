import PromptInput from "./components/PromptInput";
import PromptOutput from "./components/PromptOutput";
import Title from "./components/Title";

function App() {
    return (
        <div className="min-h-screen flex flex-col">
            <Title />
            <PromptInput />
            <PromptOutput />
        </div>
    );
}

export default App;
