import { useContext } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import api from "./api/posts";
import DataContext from "./context/DataContext";

const PostPage = () => {
  /**
   * Component to display a complete post.
   */
  const navigate = useNavigate();
  const { posts, setPosts } = useContext(DataContext);
  // access the id of the post from the URL
  const { id } = useParams(); // this variable has to be called the same as the path variable in the route
  // find the post with the right id
  const post = posts.find((post) => post.id.toString() === id);

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
    <main className="PostPage">
      <article className="Post">
        {/* if we find a post with the right id, then display it nicely */}
        {post && (
          <>
            <h2>{post.title}</h2>
            <p className="postDate">{post.datetime}</p>
            <p className="postBody">{post.body}</p>
            <Link to={`/edit/${post.id}`}>
              <button className="editButton">Edit Post</button>
            </Link>
            <button
              className="deleteButton"
              onClick={() => handleDelete(post.id)}
            >
              Delete Post
            </button>
          </>
        )}
        {/* if we do NOT find a post with the right id, then display a message */}
        {!post && (
          <>
            <h2>Page not Found</h2>
            <p> Well, that's disappointing</p>
            <p>
              <Link to="/">Visit Our Homepage</Link>
            </p>
          </>
        )}
      </article>
    </main>
  );
};

export default PostPage;
