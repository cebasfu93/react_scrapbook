// displayed depending on user interaction
import About from "./About";
import Home from "./Home";
import Missing from "./Missing"; // 404 page
import NewPost from "./NewPost";
import PostPage from "./PostPage";
// router dependencies and hooks
import { Route, Routes, useNavigate } from "react-router-dom";
import Layout from "./Layout";
// react hooks
import { useEffect, useState } from "react";
// other dependencies
import { format } from "date-fns";

function App() {
  const [search, setSearch] = useState("");
  const [posts, setPosts] = useState([
    {
      id: 1,
      title: "My First Post",
      datetime: "July 01, 2021 11:17:36 AM",
      body: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis consequatur expedita, assumenda similique non optio! Modi nesciunt excepturi corrupti atque blanditiis quo nobis, non optio quae possimus illum exercitationem ipsa!",
    },
    {
      id: 2,
      title: "My 2nd Post",
      datetime: "July 01, 2021 11:17:36 AM",
      body: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis consequatur expedita, assumenda similique non optio! Modi nesciunt excepturi corrupti atque blanditiis quo nobis, non optio quae possimus illum exercitationem ipsa!",
    },
    {
      id: 3,
      title: "My 3rd Post",
      datetime: "July 01, 2021 11:17:36 AM",
      body: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis consequatur expedita, assumenda similique non optio! Modi nesciunt excepturi corrupti atque blanditiis quo nobis, non optio quae possimus illum exercitationem ipsa!",
    },
    {
      id: 4,
      title: "My Fourth Post",
      datetime: "July 01, 2021 11:17:36 AM",
      body: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis consequatur expedita, assumenda similique non optio! Modi nesciunt excepturi corrupti atque blanditiis quo nobis, non optio quae possimus illum exercitationem ipsa!",
    },
  ]);
  const [searchResults, setSearchResults] = useState([]);
  const [postTitle, setPostTitle] = useState("");
  const [postBody, setPostBody] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const filteredResults = posts.filter(
      (post) =>
        post.body.toLowerCase().includes(search.toLowerCase()) ||
        post.title.toLowerCase().includes(search.toLowerCase())
    );
    setSearchResults(filteredResults.reverse());
  }, [posts, search]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const id = posts.length ? posts.length + 1 : 1;
    const datetime = format(new Date(), "MMMM dd, yyyy pp");
    const newPost = {
      id: id,
      title: postTitle,
      body: postBody,
      datetime: datetime,
    };
    const allPosts = [...posts, newPost];
    setPosts(allPosts);
    setPostTitle("");
    setPostBody("");
    navigate("/");
  };
  const handleDelete = (id) => {
    const postsList = posts.filter((post) => post.id !== id);
    setPosts(postsList);
    navigate("/");
  };
  return (
    <Routes>
      {/* Route the root path to the Layout component */}
      <Route
        path="/"
        element={<Layout search={search} setSearch={setSearch} />}
      >
        {/* the Outlet in the Layout is going to be populated with a Home component */}
        {/* the index option makes the Home element the default */}
        <Route index element={<Home posts={searchResults} />} />
        {/* Subroute to the path "/post" */}
        <Route path="post">
          {/* the default content of the "/post" page is a NewPost component */}
          <Route
            index
            element={
              <NewPost
                handleSubmit={handleSubmit}
                postTitle={postTitle}
                setPostTitle={setPostTitle}
                postBody={setPostBody}
                setPostBody={setPostBody}
              />
            }
          />
          {/* the content of the "/post:1" page is a PostPage component */}
          <Route
            path=":id"
            element={<PostPage posts={posts} handleDelete={handleDelete} />}
          />
        </Route>
        {/* the default content of the "/about" page is an About component */}
        <Route path="about" element={<About />} />
        {/* all other URLs are routed to a Missing (404) component */}
        <Route path="*" element={<Missing />} />
      </Route>
    </Routes>
  );
}

export default App;
