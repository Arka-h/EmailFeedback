import "materialize-css/dist/css/materialize.min.css";
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux"; //houses the store, and provides it
import { createStore, applyMiddleware } from "redux";
// createStore creates a store to maintain state of the application
import App from "./components/App";
import reducers from "./reducers";
import reduxThunk from "redux-thunk"

const store = createStore(
  reducers /*()=>{reducerFunction }*/,
  {
    /*Enhancer */
  },
  applyMiddleware(reduxThunk)
);
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.querySelector("#root")
);
