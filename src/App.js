import React from "react";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./store";
import Router from "./router";
import Navigation from "./navigation";
import "./App.css";

import background from "./images/background.jpg";

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <img
          alt=''
          src={background}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            position: "fixed",
            zIndex: "-1",
            top: 0,
          }}
        />
        <Navigation />
        <Router />
      </BrowserRouter>
    </Provider>
  );
}

export default App;
