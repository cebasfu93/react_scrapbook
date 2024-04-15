import { useState } from "react";
import AddItem from "./AddItem";
import "./App.css";
import Content from "./Content";
import Footer from "./Footer";
import Header from "./Header";
import SearchItem from "./SearchItem";

function App() {
  const [items, setItems] = useState(
    // state variable for all the items in the shopping list
    // if there is no shoppinglist in the cache, use an empty list
    JSON.parse(localStorage.getItem("shoppinglist")) || []
  );
  const [newItem, setNewItem] = useState(""); // state variable for the new item to be added
  const [search, setSearch] = useState(""); // state variable for the search input

  const setAndSaveItems = (newItems) => {
    /**
     * Update the items list and save it in cache
     */
    // use the updated list to set the state
    setItems(newItems);
    // save the latest list in cache
    localStorage.setItem("shoppinglist", JSON.stringify(newItems));
  };

  const addItem = (item) => {
    /**
     * Add a new item to the list
     */
    // compute the ID of the new item based on how many items there are in the items list
    const id = items.length ? items[items.length - 1].id + 1 : 1;
    const myNewItem = { id: id, checked: false, item: item }; // define the new item
    const listItems = [...items, myNewItem]; // unpack the current items and add the new item
    setAndSaveItems(listItems);
  };

  const handleCheck = (id) => {
    /**
     * Toggle the checked property of an item
     */
    // something like a list comprehension.
    ///For every item in  the list, if the id matches the input, return the item with its checked property toggled.
    // Otherwise, return the item as is.
    const listItems = items.map((item) =>
      item.id === id ? { ...item, checked: !item.checked } : item
    );
    setAndSaveItems(listItems);
  };

  const handleDelete = (id) => {
    /**
     * Delete an item from the list
     */
    const listItems = items.filter((item) => item.id !== id); // redo the list excluding the item with id `id`
    setAndSaveItems(listItems);
  };

  const handleSubmit = (e) => {
    /**
     * Handle the form submission. In this example, it adds a new item to the list
     */
    e.preventDefault(); // prevent the default form submission, i.e., reloading the whole page
    if (!newItem) return; // if the input is empty, do nothing
    addItem(newItem); // add the new item to the list
    setNewItem(""); // clear the input field after submitting
  };

  return (
    // className is used to apply CSS classes to the elements
    <div className="App">
      <Header title="Groceries" />
      <AddItem
        newItem={newItem}
        setNewItem={setNewItem}
        handleSubmit={handleSubmit}
      />
      <SearchItem search={search} setSearch={setSearch} />
      <Content
        items={items.filter((item) =>
          item.item.toLowerCase().includes(search.toLowerCase())
        )}
        handleCheck={handleCheck}
        handleDelete={handleDelete}
      />
      <Footer length={items.length} />
    </div>
  );
}

export default App;
