import React from "react";

const Content = () => {
  const handleNameChange = () => {
    const names = ["John", "Jane", "Doe"];
    const int = Math.floor(Math.random() * names.length);
    return names[int];
  };

  const handleClick = () => {
    console.log("You clicked me!");
  };

  const handleClick2 = (name) => {
    console.log(`${name} clicked me`);
  };

  const handleClick3 = (e) => {
    console.log(e.target.innerText);
  };

  return (
    <div>
      <p>Hello {handleNameChange()}</p>
      <button onClick={handleClick}>My first button!</button>
      <button onClick={() => handleClick2("Dave")}>My second button!</button>
      <button onClick={(e) => handleClick3(e)}>My third button!</button>
    </div>
  );
};

export default Content;
