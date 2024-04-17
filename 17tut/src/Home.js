import Feed from "./Feed";
const Home = ({ posts }) => {
  /**
   * Home component to display a list of blog posts as previews. The heavy lifting is done by the Feed component.
   */
  return (
    // if there are posts, then display the Feed component, otherwise display a message.
    <main className="Home">
      {posts.length ? (
        <Feed posts={posts} />
      ) : (
        <p style={{ marginTop: "2rem" }}>No posts to display</p>
      )}
    </main>
  );
};

export default Home;
