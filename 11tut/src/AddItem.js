import { useRef } from "react";
import { FaPlus } from "react-icons/fa";

const AddItem = ({ newItem, setNewItem, handleSubmit }) => {
  /**
   * Component that displays the input field for adding a new item
   */
  // refs used to access the DOM element of the input field.
  // Nothing happens here (similar to useState)
  // This is called a hook
  const inputRef = useRef();
  // console.log(inputRef, document.getElementById("addItem"));  # return the HTML element
  return (
    // className is used to apply CSS classes to the elements
    // onSubmit is a function that is called when the form is submitted,
    // i.e., when the user presses Enter or the "submit" button (if any)
    <form className="addForm" onSubmit={handleSubmit}>
      {/* All input fields should have an associated label */}
      {/* label for the search field. The CSS style will hide it, but it is useful for blind people's aids */}
      {/* htmlFor binds the label to the component with that value as `id` */}
      <label htmlFor="addItem">Add item field</label>
      <input
        // focus on the input field when the page loads, i.e. you can immediately start typing in this text field.
        autoFocus
        ref={inputRef} // links the DOM element of this input field to the ref
        id="addItem" // id to link the label to the input field
        type="text"
        placeholder="Add item"
        required
        value={newItem} // default value
        // upon change, set the text to whatever the user wrote (fetched through the onChange event instance, e)
        onChange={(e) => setNewItem(e.target.value)}
      />
      <button
        type="submit" // all forms need a submit button
        aria-label="Add Item" // accessibility label (like the label with htmlFor above)
        // gives the focus back to the input field.
        // This avoids the button remaining focussed after clicking it
        // by default (although it varies between browsers and OS), buttons remain focussed after clicking them
        onClick={() => inputRef.current.focus()}
      >
        <FaPlus /> {/* places a plus icon inside the button */}
      </button>
    </form>
  );
};
export default AddItem;
