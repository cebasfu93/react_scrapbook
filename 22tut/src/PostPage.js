import { useStoreActions, useStoreState } from "easy-peasy";
import { Link, useNavigate, useParams } from "react-router-dom";

const PostPage = () => {
  /**
   * Component to display a complete post.
   */
  // access the id of the post from the URL
  const { id } = useParams(); // this variable has to be called the same as the path variable in the route

  const deletePost = useStoreActions((actions) => actions.deletePost);
  const getPostById = useStoreState((state) => state.getPostById);
  const post = getPostById(id);

  const navigate = useNavigate();

  const handleDelete = (id) => {
    /**
     * Function to delete a blog post from the app.
     */
    deletePost(id);
    navigate("/");
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
