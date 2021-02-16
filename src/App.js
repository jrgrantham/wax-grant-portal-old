import React from "react";
import { NavLink } from "react-router-dom";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store/projectData/store";
import Router from "./router";
import "./App.css";

import { singleRow } from "./data/workPackages";
import {
  addNewRow,
  deleteRow,
} from "./store/projectData/workPackageActionCreators";

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

setTimeout(() => {
  store.dispatch(addNewRow(singleRow));
}, 1500);

setTimeout(() => {
  store.dispatch(deleteRow("ganttRow1"));
}, 2000);

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Navigation />
        <Router />
      </BrowserRouter>
    </Provider>
  );
}

export default App;
