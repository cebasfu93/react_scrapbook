import { Route, Routes } from "react-router-dom";
import About from "./About";
import EditPost from "./EditPost";
import Home from "./Home";
import Layout from "./Layout";
import Missing from "./Missing"; // 404 page
import NewPost from "./NewPost";
import PostPage from "./PostPage";
import { DataProvider } from "./context/DataContext";

function App() {
  /**
   * // Blog app with React Router.
   */

  return (
    <DataProvider>
      <Routes>
        {/* Route the root path to the Layout component */}
        <Route path="/" element={<Layout />}>
          {/* the Outlet in the Layout is going to be populated with a Home component */}
          {/* the index option makes the Home element the default */}
          <Route index element={<Home />} />
          {/* Subroute to the path "/post" */}
          <Route path="post">
            {/* the default content of the "/post" page is a NewPost component */}
            <Route index element={<NewPost />} />
            {/* the content of the "/post:1" page is a PostPage component */}
            <Route path=":id" element={<PostPage />} />
          </Route>

          <Route path="edit">
            {/* the default content of the "/edit/?" page is an EditPost component */}
            <Route path=":id" element={<EditPost />} />
          </Route>

          {/* the default content of the "/about" page is an About component */}
          <Route path="about" element={<About />} />
          {/* all other URLs are routed to a Missing (404) component */}
          <Route path="*" element={<Missing />} />
        </Route>
      </Routes>
    </DataProvider>
  );
}

export default App;
