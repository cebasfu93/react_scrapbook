import { useStoreActions, useStoreState } from "easy-peasy";
import { useEffect } from "react";
import { Link } from "react-router-dom";

const Nav = () => {
  /**
   * Navigation menu of the blog.
   */
  const posts = useStoreState((state) => state.posts);
  const search = useStoreState((state) => state.search);
  const setSearch = useStoreActions((actions) => actions.setSearch);
  const setSearchResults = useStoreActions(
    (actions) => actions.setSearchResults
  );

  // hook to filter posts whenever the posts or the search bar changes
  useEffect(() => {
    // keep posts with any matching text in the title or body
    const filteredResults = posts.filter(
      (post) =>
        post.body.toLowerCase().includes(search.toLowerCase()) ||
        post.title.toLowerCase().includes(search.toLowerCase())
    );
    // set the search results to the filtered results.
    // reverse to get the most recent posts first
    setSearchResults(filteredResults.reverse());
  }, [posts, search, setSearchResults]);

  return (
    <nav className="Nav">
      <form className="searchForm" onSubmit={(e) => e.preventDefault()}>
        {/* Label for the input component, i.e., the htmlFor of the label should match the id of the input field */}
        <label htmlFor="search">Search Posts</label>
        <input
          id="search"
          type="text"
          placeholder="Search for posts"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </form>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/post">Post</Link>
        </li>
        <li>
          <Link to="/about">About</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Nav;
