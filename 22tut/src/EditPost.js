import { format } from "date-fns";
import { useStoreActions, useStoreState } from "easy-peasy";
import { useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

const EditPost = () => {
  /**
   * Component to edit a blog post.
   */
  const { id } = useParams();
  const navigate = useNavigate();

  const editTitle = useStoreState((state) => state.editTitle);
  const editBody = useStoreState((state) => state.editBody);

  const editPost = useStoreActions((actions) => actions.editPost);
  const setEditTitle = useStoreActions((actions) => actions.setEditTitle);
  const setEditBody = useStoreActions((actions) => actions.setEditBody);

  const getPostById = useStoreState((state) => state.getPostById);
  const post = getPostById(id);

  useEffect(() => {
    if (post) {
      setEditTitle(post.title);
      setEditBody(post.body);
    }
  }, [post, setEditTitle, setEditBody]);

  const handleEdit = (id) => {
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
    editPost(updatedPost);
    navigate(`/post/${id}`);
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
            <button type="button" onClick={() => handleEdit(post.id)}>
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
