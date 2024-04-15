// the Header component can take a prop called title
const Header = ({ title }) => {
  /**
   * The header component. It just displays the title of the app.
   */
  return (
    <header
      style={{
        backgroundColor: "mediumblue",
        color: "#fff",
      }}
    >
      <h1>{title}</h1>
    </header>
  );
};

// set a default value for the props of Header
Header.defaultProps = {
  title: "Default Title",
};

export default Header;
