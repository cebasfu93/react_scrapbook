import Post from "./Post";
const Feed = ({ posts }) => {
  /**
   * Displays the blog posts as a preview list. The Post component is used to display the preview of each post.
   */
  return (
    <>
      {posts.map((post) => (
        <Post key={post.id} post={post} />
      ))}
    </>
  );
};

export default Feed;
