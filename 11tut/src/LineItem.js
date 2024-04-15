import { FaTrashAlt } from "react-icons/fa";

const LineItem = ({ item, handleCheck, handleDelete }) => {
  /**
   * Component that displays a single item in the list
   */
  return (
    // <li> is list item
    // className is used to apply CSS classes to the elements
    <li className="item">
      <input
        type="checkbox"
        onChange={() => {
          handleCheck(item.id);
        }}
        checked={item.checked}
      />
      <label
        style={item.checked ? { textDecoration: "line-through" } : null}
        onDoubleClick={() => {
          handleCheck(item.id);
        }}
      >
        {item.item}
      </label>
      <FaTrashAlt
        onClick={() => handleDelete(item.id)}
        role="button" // make the icon clickable
        tabIndex="0" // allow the icon to be focused (i.e. selecting it with the Tab key)
      />
    </li>
  );
};
export default LineItem;
