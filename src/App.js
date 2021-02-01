import React from "react";
import { NavLink } from "react-router-dom";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./state/store";
import Router from "./router";
import "./App.css";

const Navigation = () => (
  <nav>
    <ul>
      <li>
        <NavLink to="/">Home</NavLink>
      </li>
      <li>
        <NavLink to="/gantt">gantt</NavLink>
      </li>
    </ul>
  </nav>
);

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Navigation />
        <div className="App"></div>
        <Router />
      </BrowserRouter>
    </Provider>
  );
}

export default App;
