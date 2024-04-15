import ItemList from "./ItemList";

const Content = ({ items, handleCheck, handleDelete }) => {
  /**
   * Body of the app. It displays the list of items.
   */
  return (
    <>
      {items.length !== 0 ? ( // if there are items in the list, display them
        <ItemList
          items={items}
          handleCheck={handleCheck}
          handleDelete={handleDelete}
        />
      ) : (
        <p style={{ marginTop: "2rem" }}>There are no items in your list</p> // if there are no items, display a message
      )}
    </>
  );
};

export default Content;
