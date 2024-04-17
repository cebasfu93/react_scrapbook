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
// date functions
import { format } from "date-fns";

function App() {
  /**
   * // Blog app with React Router.
   */
  const [posts, setPosts] = useState([
    // the starting posts
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
  const [search, setSearch] = useState(""); // state variable to keep track of the text in the search bar
  const [searchResults, setSearchResults] = useState([]); // state variable to keep track of the search results
  const [postTitle, setPostTitle] = useState(""); // state variable to keep track of the title of a new post
  const [postBody, setPostBody] = useState(""); // state variable to keep track of the body of a new post
  const navigate = useNavigate();

  // hook to filter posts whenever the posts or the search bar changes
  useEffect(() => {
    // keep posts with any matching text in the title or body
    const filteredResults = posts.filter(
      (post) =>
        post.body.toLowerCase().includes(search.toLowerCase()) ||
        post.title.toLowerCase().includes(search.toLowerCase())
    );
    // set the search results to the filtered results.
    // reverse to get the most recent posts first
    setSearchResults(filteredResults.reverse());
  }, [posts, search]);

  const handleSubmit = (e) => {
    /**
     * Function to submit a new blog post to the app.
     */
    e.preventDefault(); // prevent the default form submission, i.e., reloading the page
    const id = posts.length ? posts.length + 1 : 1; // generate a new id or use 1 if there are no posts
    const datetime = format(new Date(), "MMMM dd, yyyy pp"); // format the current date and time
    const newPost = {
      // define a new post based on the form inputs (which have been stored in state variables)
      id: id,
      title: postTitle,
      body: postBody,
      datetime: datetime,
    };
    const allPosts = [...posts, newPost]; // redefine the posts array with the new post
    // update the posts
    setPosts(allPosts);
    // reset form fields
    setPostTitle("");
    setPostBody("");
    // navigate to the home page
    navigate("/");
  };

  const handleDelete = (id) => {
    /**
     * Function to delete a blog post from the app.
     */
    // filter out the post with the given id
    const postsList = posts.filter((post) => post.id !== id);
    // update the posts and navigate to the home page
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
