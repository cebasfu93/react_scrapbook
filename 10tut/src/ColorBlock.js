const ColorBlock = ({ inputRef, colorName }) => {
  return (
    <div>
      <button ref={inputRef}>
        <p>{colorName === "" ? "Empty Value" : colorName}</p>
      </button>
    </div>
  );
};

export default ColorBlock;
