import { useEffect, useState } from "react";
import AddItem from "./AddItem";
import "./App.css";
import Content from "./Content";
import Footer from "./Footer";
import Header from "./Header";
import SearchItem from "./SearchItem";
import apiRequest from "./apiRequest";

function App() {
  const API_URL = "http://localhost:3500/items"; // URL of the server started with `npx json-server -p 3500 db.json`
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState(""); // state variable for the new item to be added
  const [search, setSearch] = useState(""); // state variable for the search input
  const [fetchError, setFetchError] = useState(null);
  const [isLoading, setIsLoading] = useState(true); // when the app is first loaded, it will load data

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await fetch(API_URL); // does a request to the server
        // response.ok is equivalent to a response with status in the range 200-299
        if (!response.ok) throw Error("Did not receive expected data"); // if the response is not ok, throw an error
        const listItems = await response.json(); // parse the response as JSON
        setItems(listItems); // set the items state variable to the list of items
        setFetchError(null); // clear the error state variable
      } catch (err) {
        console.log(err.stack); // log the error to the console
        setFetchError(err.message); // set the error state variable to the error message
      } finally {
        // done after the try/catch regardless of the outcome
        setIsLoading(false); // set the loading state variable to false
      }
    };

    // fetchItems(); // call the fetchItems function
    // sleep for 2 s before running to mock a slow network
    setTimeout(() => fetchItems(), 2000);
  }, []);

  const addItem = async (item) => {
    /**
     * Add a new item to the list in the dashboard and in the store.
     */
    // compute the ID of the new item based on how many items there are in the items list
    const id = items.length ? items[items.length - 1].id + 1 : 1;
    const myNewItem = { id: id, checked: false, item: item }; // define the new item
    const listItems = [...items, myNewItem]; // unpack the current items and add the new item
    setItems(listItems);

    const postOptions = {
      method: "POST", // the of request to make
      headers: {
        "Content-Type": "application/json", // the type of data being sent
      },
      body: JSON.stringify(myNewItem), // the data to send
    };
    const result = await apiRequest(API_URL, postOptions); // make a POST request to the server
    if (result) setFetchError(result); // if result is not null, then set the fetchError state variable to true (i.e, not null)
  };

  const handleCheck = async (id) => {
    /**
     * Toggle the checked property of an item in the dashboard and in the store.
     */
    // something like a list comprehension.
    ///For every item in  the list, if the id matches the input, return the item with its checked property toggled.
    // Otherwise, return the item as is.
    const listItems = items.map((item) =>
      item.id === id ? { ...item, checked: !item.checked } : item
    );
    setItems(listItems);

    const myItem = listItems.filter((item) => item.id === id); // get the id of the item that was toggled
    const updateOptions = {
      method: "PATCH", // requeste to update a specific entry
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ checked: myItem[0].checked }), // property to update in the object (the object to update is pointed by the URL)
    };
    // URL of the PATCH request pointing to the object to update
    const reqUrl = `${API_URL}/${id}`;
    const result = await apiRequest(reqUrl, updateOptions); // make a PATCH request to the server
    if (result) setFetchError(result); // if result is not null, then set the fetchError state variable to true (i.e, not null)
  };

  const handleDelete = async (id) => {
    /**
     * Delete an item from the list and from the store.
     */
    const listItems = items.filter((item) => item.id !== id); // redo the list excluding the item with id `id`
    setItems(listItems);
    const deleteOptions = {
      method: "DELETE", // request to delete an entry
    };
    const reqUrl = `${API_URL}/${id}`; // URL indicating what entry to delete
    const result = await apiRequest(reqUrl, deleteOptions); // make a DELETE request to the server
    if (result) setFetchError(result); // if result is not null, then set the fetchError state variable to true (i.e, not null)
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
      <main>
        {isLoading && <p>Loading</p>}
        {/* if there is an error, then show it */}
        {fetchError && <p style={{ color: "red" }}>{`Error: ${fetchError}`}</p>}
        {/* If there is no error, then show the list of items (even if there are 0 items) */}
        {!fetchError && (
          <Content
            items={items.filter((item) =>
              item.item.toLowerCase().includes(search.toLowerCase())
            )}
            handleCheck={handleCheck}
            handleDelete={handleDelete}
          />
        )}
      </main>
      <Footer length={items.length} />
    </div>
  );
}

export default App;
