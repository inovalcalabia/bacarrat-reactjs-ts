// import app from "./App.css";
import React, { Component } from "react";
import { Provider } from "react-redux";
import InGame from "./components/InGame";
import { store } from "./store/store";
import { any } from "prop-types";


class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div className="App">
          <InGame />
        </div>
      </Provider>
    );
  }
}

export default App;
