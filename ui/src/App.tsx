import PromptInput from "./components/Prompt/PromptInput";
import PromptOutput from "./components/PromptOutput";
import Title from "./components/Title";
import PromptOutputTool from "./components/PromptOutputTool";
import AuthenticationTool from "./components/AuthenticationTool";

function App() {
    return (
        <div className="min-h-screen flex flex-col">
            <AuthenticationTool />
            <Title />
            <PromptInput />
            <PromptOutput />
            <PromptOutputTool />
        </div>
    );
}

export default App;
