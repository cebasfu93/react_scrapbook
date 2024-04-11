const InputText = ({ handleChange }) => {
  return (
    <form onSubmit={(e) => e.preventDefault()}>
      {/* <label htmlFor="colorbox" />
      Color name field
      <label /> */}
      <input
        id="colorbox"
        type="text"
        placeholder="Add color name"
        // value={colorName}
        onChange={handleChange}
      />
    </form>
  );
};

export default InputText;
