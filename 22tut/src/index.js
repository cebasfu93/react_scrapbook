import { StoreProvider } from "easy-peasy";
import React from "react";
import ReactDOM from "react-dom/client";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import App from "./App";
import "./index.css";
import store from "./store";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <StoreProvider store={store}>
      {/*  Starts a Router component instead of an App component directly */}
      <Router>
        {/* The latest version of react-router-dom needs all Route components inside a Routes one */}
        <Routes>
          <Route path="/*" element={<App />} />
          {/* Create a route that points the root path (or URL) to the App component */}
          {/* In this case, all paths will be forwarded to the App component */}
        </Routes>
      </Router>
    </StoreProvider>
  </React.StrictMode>
);
