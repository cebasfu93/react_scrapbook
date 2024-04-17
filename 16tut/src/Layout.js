import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import Header from "./Header";
import Nav from "./Nav";

const Layout = ({ search, setSearch }) => {
  /**
   * Dynamic layout component.
   */
  return (
    <div className="App">
      <Header title="React JS Blog" />
      <Nav search={search} setSearch={setSearch} />
      <Outlet />{" "}
      {/* Outlets are populated based on the Route given after instantiating a Layout (see App) */}
      <Footer />
    </div>
  );
};

export default Layout;
