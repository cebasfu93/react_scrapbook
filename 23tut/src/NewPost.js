import { format } from "date-fns";
import { useStoreActions, useStoreState } from "easy-peasy";
import { useNavigate } from "react-router-dom";

const NewPost = () => {
  /**
   * Component to create a new post.
   */
  const navigate = useNavigate();

  const posts = useStoreState((state) => state.posts);
  const postTitle = useStoreState((state) => state.postTitle);
  const postBody = useStoreState((state) => state.postBody);
  const savePost = useStoreActions((actions) => actions.savePost);
  const setPostTitle = useStoreActions((actions) => actions.setPostTitle);
  const setPostBody = useStoreActions((actions) => actions.setPostBody);

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
    savePost(newPost); // save the new post to the store
    // navigate to the home page
    navigate("/");
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
