import colorNames from "colornames";

const Input = ({
  colorValue,
  setColorValue,
  setHexValue,
  isDarkTest,
  setIsDarkTest,
}) => {
  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <label htmlFor="colorbox" />
      Add color name:
      <label />
      <input
        autoFocus
        required
        id="colorbox"
        type="text"
        placeholder="Add color name"
        value={colorValue}
        onChange={(e) => {
          setColorValue(e.target.value);
          setHexValue(colorNames(e.target.value));
        }}
      />
      <button
        type="button" // the default in a form is "submit"
        onClick={() => setIsDarkTest(!isDarkTest)}
        aria-label="Toggle text color"
      >
        Toggle text color
      </button>
    </form>
  );
};

export default Input;
