import React, { useState } from "react";

const Content = () => {
  const [name, setName] = useState("John");
  const [count, setCount] = useState(0);

  const handleNameChange = () => {
    const names = ["John", "Jane", "Doe"];
    const int = Math.floor(Math.random() * names.length);
    setName(names[int]);
  };

  const handleClick = () => {
    setCount(count + 1);
    setCount(count + 1);
    console.log(count);
  };

  const handleClick2 = () => {
    console.log(count);
  };

  return (
    <div>
      <p onDoubleClick={handleClick}>Hello {name}</p>
      <button onClick={handleNameChange}>Changed name!</button>
      <button onClick={handleClick}>My second button!</button>
      <button onClick={handleClick2}>My third button!</button>
    </div>
  );
};

export default Content;
