import { useStoreState } from "easy-peasy";
import Feed from "./Feed";

const Home = ({ isLoading, fetchError }) => {
  /**
   * Home component to display a list of blog posts as previews. The heavy lifting is done by the Feed component.
   */
  const searchResults = useStoreState((state) => state.searchResults);
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
        (searchResults.length ? (
          <Feed posts={searchResults} />
        ) : (
          <p className="statusMsg">No posts to display</p>
        ))}
    </main>
  );
};

export default Home;
