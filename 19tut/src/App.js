// displayed depending on user interaction
import About from "./About";
import EditPost from "./EditPost";
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
// import api
import api from "./api/posts";

function App() {
  /**
   * // Blog app with React Router.
   */
  const [posts, setPosts] = useState([]);
  const [search, setSearch] = useState(""); // state variable to keep track of the text in the search bar
  const [searchResults, setSearchResults] = useState([]); // state variable to keep track of the search results
  const [postTitle, setPostTitle] = useState(""); // state variable to keep track of the title of a new post
  const [postBody, setPostBody] = useState(""); // state variable to keep track of the body of a new post
  const [editTitle, setEditTitle] = useState(""); // state variable to keep track of the edited title of a post
  const [editBody, setEditBody] = useState(""); // state variable to keep track of the edited body of a post
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        // fetch the data using axios
        // axios raises an error if the response status is not in the range 200-299, so no need to check response.ok
        const response = await api.get("/posts");
        setPosts(response.data);
      } catch (err) {
        if (err.response) {
          // response not in the 200 range
          console.log(err.response.data);
          console.log(err.response.status);
          console.log(err.response.headers);
        } else {
          console.log(`Error: ${err.message}`);
        }
      }
    };
    fetchPosts();
  }, []);

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

  const handleSubmit = async (e) => {
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
    try {
      const response = await api.post("/posts", newPost);
      const allPosts = [...posts, response.data]; // redefine the posts array with the new post (as posted by axios)
      // update the posts
      setPosts(allPosts);
      // reset form fields
      setPostTitle("");
      setPostBody("");
      // navigate to the home page
      navigate("/");
    } catch (err) {
      console.log(`Error: ${err.message}`);
    }
  };

  const handleEdit = async (id) => {
    /**
     * Function to edit a blog post in the app.
     */
    const datetime = format(new Date(), "MMMM dd, yyyy pp"); // format the current date and time
    const updatedPost = {
      // define a new post based on the edited form inputs (which have been stored in state variables)
      id: id,
      title: editTitle,
      body: editBody,
      datetime: datetime,
    };

    try {
      // override an entry in the server with the updated post
      const response = await api.put(`/posts/${id}`, updatedPost);
      // the updated post is in response.data
      // update the posts with their original values except for the post with the given id, which is updated
      setPosts(
        posts.map((post) => (post.id === id ? { ...response.data } : post))
      );
      // reset editing fields
      setEditTitle("");
      setEditBody("");
      navigate("/");
    } catch (err) {
      console.log(`Error: ${err.message}`);
    }
  };

  const handleDelete = async (id) => {
    /**
     * Function to delete a blog post from the app.
     */
    try {
      await api.delete(`/posts/${id}`);
      // filter out the post with the given id
      const postsList = posts.filter((post) => post.id !== id);
      // update the posts and navigate to the home page
      setPosts(postsList);
      navigate("/");
    } catch (err) {
      console.log(`Error: ${err.message}`);
    }
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
                postBody={postBody}
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

        <Route path="edit">
          {/* the default content of the "/edit" page is an EditPost component */}
          <Route
            path=":id"
            element={
              <EditPost
                posts={posts}
                handleEdit={handleEdit}
                editTitle={editTitle}
                setEditTitle={setEditTitle}
                editBody={editBody}
                setEditBody={setEditBody}
              />
            }
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
