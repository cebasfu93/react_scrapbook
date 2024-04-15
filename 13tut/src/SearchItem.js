const SearchItem = ({ search, setSearch }) => {
  return (
    // className is used to apply CSS classes to the elements
    <form className="searchForm" onSubmit={(e) => e.preventDefault()}>
      {/* All input fields should have an associated label */}
      {/* label for the search field. The CSS style will hide it, but it is useful for blind people's aids */}
      {/* htmlFor binds the label to the component with that value as `id` */}
      <label htmlFor="search">Search field</label>
      <input
        id="search" // id to link the label to the input field
        type="text"
        role="searchbox"
        placeholder="Search Items" // placeholder text
        value={search} // default value
        // upon change, set the text to whatever the user wrote (fetched through the onChange event instance, e)
        onChange={(e) => setSearch(e.target.value)}
      />
    </form>
  );
};

export default SearchItem;
