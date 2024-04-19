import { FaLaptop, FaMobileAlt, FaTabletAlt } from "react-icons/fa";
import useWindowSize from "./hooks/useWindowSize";

const Header = ({ title }) => {
  /**
   * Header of the application.
   * Displays the title of the app and an icon based on the width of the window.
   */
  // access the width variable from the context
  const { width } = useWindowSize(); // the hook returns an object with the window width and height. We keep only the width.
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
