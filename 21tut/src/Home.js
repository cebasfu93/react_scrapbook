import Feed from "./Feed";
const Home = ({ posts, fetchError, isLoading }) => {
  /**
   * Home component to display a list of blog posts as previews. The heavy lifting is done by the Feed component.
   */
  return (
    // if there are posts, then display the Feed component, otherwise display a message.
    <main className="Home">
      {isLoading && <p className="statusMsg">Loading posts...</p>}
      {!isLoading && fetchError && (
        <p className="statusMsg" style={{ color: "red" }}>
          {fetchError}
        </p>
      )}
      {!isLoading &&
        !fetchError &&
        (posts.length ? (
          <Feed posts={posts} />
        ) : (
          <p className="statusMsg">No posts to display</p>
        ))}
    </main>
  );
};

export default Home;
