import { createContext, useEffect, useState } from "react";
// router dependencies and hooks
import useAxiosFetch from "../hooks/useAxiosFetch";

// Create a context that will be used to pass data to all components
const DataContext = createContext({});

export const DataProvider = ({ children }) => {
  const [posts, setPosts] = useState([]);
  const [search, setSearch] = useState(""); // state variable to keep track of the text in the search bar
  const [searchResults, setSearchResults] = useState([]); // state variable to keep track of the search results

  const { data, fetchError, isLoading } = useAxiosFetch(
    "http://localhost:3500/posts"
  );

  // hook to set the posts whenever the data changes
  useEffect(() => {
    setPosts(data);
  }, [data]);

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
  }, [posts, search]);

  return (
    <DataContext.Provider
      value={{
        search,
        setSearch,
        searchResults,
        fetchError,
        isLoading,
        posts,
        setPosts,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export default DataContext;
