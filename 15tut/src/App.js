import { useState } from "react";
import "./App.css";
import ItemList from "./ItemList";
import ApiRequest from "./apiRequest";

function App() {
  const BASE_API_URL = "https://jsonplaceholder.typicode.com/";
  const [data, setData] = useState([]);

  const handleClickUsers = async () => {
    const apiUrl = `${BASE_API_URL}users`;
    await ApiRequest(setData, apiUrl);
  };

  const handleClickPosts = async () => {
    const apiUrl = `${BASE_API_URL}posts`;
    await ApiRequest(setData, apiUrl);
  };

  const handleClickComments = async () => {
    const apiUrl = `${BASE_API_URL}comments`;
    await ApiRequest(setData, apiUrl);
  };

  console.log(data);
  console.log(data.length);
  return (
    <div className="App">
      <header>
        <button onClick={handleClickUsers}>users</button>
        <button onClick={handleClickPosts}>posts</button>
        <button onClick={handleClickComments}>comments</button>
      </header>
      <main>
        <div>{data.length}</div>
        <ItemList data={data} />
      </main>
    </div>
  );
}

export default App;
