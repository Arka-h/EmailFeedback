// Data layer control (redux)
import 'materialize-css/dist/css/materialize.min.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import App from './components/App';
import rootReducer from './reducers'
import axios from 'axios';
window.axios=axios
// WebPack helps in importing and adding css files into the application

const store = createStore(rootReducer, {}, applyMiddleware(thunk))

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>
  ,
  document.getElementById('root')
);

//? We used the server name client, as node in production automatically takes the 
//? bundled contents inside public to be the public assets, whenever a user visits our webpagePropTypes.
//? In production, create-react-app doesn't even exist, only the bundle does, and so the relative paths become useful
//? The proxy is needed to simulate both in the same environment, since they are running on different ports
//? Each `index.js` file is by default there for that dir

 //! all custom env REACT_APP_*

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
