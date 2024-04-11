import { useState } from "react";
// import "./App.css";
import Input from "./Input";
import Square from "./Square";

function App() {
  const [colorValue, setColorValue] = useState("");
  const [hexValue, setHexValue] = useState("");
  const [isDarkTest, setIsDarkTest] = useState(true);

  return (
    <div className="App">
      <Square
        colorValue={colorValue}
        hexValue={hexValue}
        isDarkTest={isDarkTest}
      />
      <Input
        colorValue={colorValue}
        setColorValue={setColorValue}
        setHexValue={setHexValue}
        isDarkTest={isDarkTest}
        setIsDarkTest={setIsDarkTest}
      />
    </div>
  );
}

export default App;
