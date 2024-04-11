import LineItem from "./LineItem";

const ItemList = ({ items, handleCheck, handleDelete }) => {
  /**
   * Component that displays the list of items if there are any.
   */
  return (
    // <ul> is unordered list
    <ul>
      {items.map((item) => (
        <LineItem
          // React needs a unique key for each item in a list. It doesnt need to be propagated anywhere else.
          // It is used internally by React to keep track of the items in the list.
          key={item.id}
          item={item}
          handleCheck={handleCheck}
          handleDelete={handleDelete}
        />
      ))}
    </ul>
  );
};

export default ItemList;
