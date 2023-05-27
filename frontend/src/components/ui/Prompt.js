import prompts from "./prompts.json";
function Prompt(props) {
  const prompt = prompts.find((p) => p.id === props.id);
  return (
    <div className="prompt">
      <h1>{prompt.prompt}</h1>
    </div>
  );
}

export default Prompt;
