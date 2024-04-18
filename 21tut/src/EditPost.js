import { format } from "date-fns";
import { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import api from "./api/posts";
import DataContext from "./context/DataContext";

const EditPost = () => {
  const navigate = useNavigate();
  const { posts, setPosts } = useContext(DataContext);
  const [editTitle, setEditTitle] = useState(""); // state variable to keep track of the edited title of a post
  const [editBody, setEditBody] = useState(""); // state variable to keep track of the edited body of a post
  const { id } = useParams();
  const post = posts.find((post) => post.id.toString() === id);
  useEffect(() => {
    if (post) {
      setEditTitle(post.title);
      setEditBody(post.body);
    }
  }, [post, setEditTitle, setEditBody]);

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

  return (
    <main className="newPost">
      {editTitle && (
        <>
          <h2>Edit Post</h2>
          <form className="newPostForm" onSubmit={(e) => e.preventDefault()}>
            <label htmlFor="editTitle">Title:</label>
            <input
              id="editTitle"
              type="text"
              required
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
            />
            <label htmlFor="editBody"> Body:</label>
            <textarea
              id="editBody"
              required
              value={editBody}
              onChange={(e) => setEditBody(e.target.value)}
            />
            <button type="submit" onClick={() => handleEdit(post.id)}>
              Submit
            </button>
          </form>
        </>
      )}
      {!editTitle && (
        <>
          <h2>Page not Found</h2>
          <p> Well, that's disappointing</p>
          <p>
            <Link to="/">Visit Our Homepage</Link>
          </p>
        </>
      )}
    </main>
  );
};

export default EditPost;
