import { useState } from "react";
import "./App.css";
import Content from "./Content";
import Footer from "./Footer";
import Header from "./Header";

function App() {
  const [items, setItems] = useState([
    {
      id: 1,
      checked: false,
      item: "One half pound bag of coffee",
    },
    {
      id: 2,
      checked: false,
      item: "Item 2",
    },
    {
      id: 3,
      checked: false,
      item: "Item 3",
    },
  ]);

  const handleCheck = (id) => {
    console.log(`key: ${id}`);
    // something like a list comprehension. For every item in  the list,
    // if the id matches the id of the item, return the item with the checked property toggled.
    // Otherwise, return the item as is.
    const listItems = items.map((item) =>
      item.id === id ? { ...item, checked: !item.checked } : item
    );
    // use the updated list to set the state
    setItems(listItems);
    // save the latest list in cache
    localStorage.setItem("shoppinglist", JSON.stringify(listItems));
  };

  const handleDelete = (id) => {
    const listItems = items.filter((item) => item.id !== id);
    setItems(listItems);
    localStorage.setItem("shoppinglist", JSON.stringify(listItems));
  };

  return (
    <div className="App">
      <Header title="Groceries" />
      <Header />
      <Content
        items={items}
        handleCheck={handleCheck}
        handleDelete={handleDelete}
      />
      <Footer length={items.length} />
    </div>
  );
}

export default App;
