import { useContext } from "react";
import Feed from "./Feed";
import DataContext from "./context/DataContext";

const Home = () => {
  /**
   * Home component to display a list of blog posts as previews. The heavy lifting is done by the Feed component.
   */
  const { searchResults, fetchError, isLoading } = useContext(DataContext);
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
