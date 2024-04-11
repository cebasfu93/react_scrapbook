const Square = ({ colorValue, hexValue, isDarkTest }) => {
  return (
    <section
      className="square"
      style={{
        backgroundColor: colorValue,
        color: isDarkTest ? "black" : "white",
      }}
    >
      <p>{colorValue ? colorValue : "EmptyValue"}</p>
      <p>{hexValue ? hexValue : null}</p>
    </section>
  );
};

Square.defaultProps = {
  colorValue: "Empty Color Value",
};

export default Square;
