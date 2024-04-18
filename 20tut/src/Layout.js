import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import Header from "./Header";
import Nav from "./Nav";
// custom hooks
import useWindowSize from "./hooks/useWindowSize";

const Layout = ({ search, setSearch }) => {
  /**
   * Dynamic layout component.
   */
  const { width } = useWindowSize(); // the hook returns an object with the window width and height. We keep only the width.

  return (
    <div className="App">
      <Header title="React JS Blog" width={width} />
      <Nav search={search} setSearch={setSearch} />
      <Outlet />{" "}
      {/* Outlets are populated based on the Route given after instantiating a Layout (see App) */}
      <Footer />
    </div>
  );
};

export default Layout;
