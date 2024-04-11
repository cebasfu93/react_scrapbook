import { useRef, useState } from "react";
import "./App.css";
import ColorBlock from "./ColorBlock";
import InputText from "./InputText";

function App() {
  const [colorName, setColorName] = useState("");
  const inputRef = useRef();

  const handleChange = (e) => {
    setColorName(e.target.value);
    if (!inputRef) return;
    console.log(e.target.value);
    inputRef.current.style.backgroundColor = e.target.value;
  };

  return (
    <div className="App">
      <ColorBlock inputRef={inputRef} colorName={colorName} />
      <InputText handleChange={handleChange} setColorName={setColorName} />
    </div>
  );
}

export default App;
