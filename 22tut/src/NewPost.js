import { format } from "date-fns";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "./api/posts";
import DataContext from "./context/DataContext";

const NewPost = () => {
  /**
   * Component to create a new post.
   */
  const navigate = useNavigate();
  const { posts, setPosts } = useContext(DataContext);
  const [postTitle, setPostTitle] = useState(""); // state variable to keep track of the title of a new post
  const [postBody, setPostBody] = useState(""); // state variable to keep track of the body of a new post

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

  return (
    <main className="newPost">
      <h2>New Post</h2>
      <form className="newPostForm" onSubmit={handleSubmit}>
        <label htmlFor="postTitle">Title:</label>
        <input
          id="postTitle"
          type="text"
          required
          value={postTitle}
          onChange={(e) => setPostTitle(e.target.value)}
        />
        <label htmlFor="postBody"> Body:</label>
        <textarea
          id="postBody"
          required
          value={postBody}
          onChange={(e) => setPostBody(e.target.value)}
        />
        <button type="submit">Submit</button>
      </form>
    </main>
  );
};

export default NewPost;
