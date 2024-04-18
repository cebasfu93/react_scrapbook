import { FaLaptop, FaMobileAlt, FaTabletAlt } from "react-icons/fa";

const Header = ({ title, width }) => {
  /**
   * Header of the application.
   * Displays the title of the app and an icon based on the width of the window.
   */
  return (
    <header className="Header">
      <h1>{title}</h1>
      {width < 768 ? (
        <FaMobileAlt />
      ) : width < 992 ? (
        <FaTabletAlt />
      ) : (
        <FaLaptop />
      )}
    </header>
  );
};

export default Header;
