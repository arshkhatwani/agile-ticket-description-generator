import PromptInput from "./components/Prompt/PromptInput";
import PromptOutput from "./components/PromptOutput";
import Title from "./components/Title";
import PromptOutputTool from "./components/PromptOutputTool";

function App() {
    return (
        <div className="min-h-screen flex flex-col">
            <Title />
            <PromptInput />
            <PromptOutput />
            <PromptOutputTool />
        </div>
    );
}

export default App;
