// react
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import reportWebVitals from "./reportWebVitals";

// redux
import { applyMiddleware, createStore } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import rootReducer from "./redux/reducers/rootReducer";

// app other
import "./index.scss";
import App from "./App";

// firebase
import firebase from "firebase/app";
import "firebase/auth";

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);

if (!firebase.apps.length) {
  firebase.initializeApp({
    apiKey: "AIzaSyDp8yXqLXhG2LjAyPkb18hbKRa98gq14jo",
    authDomain: "gallaxery-e6cf4.firebaseapp.com",
    projectId: "gallaxery-e6cf4",
    storageBucket: "gallaxery-e6cf4.appspot.com",
    messagingSenderId: "338223913035",
    appId: "1:338223913035:web:a76ecef5c3d66bdf0695ce",
    measurementId: "G-GFH7XM6GKX",
  });
} else {
  firebase.app();
}

const auth = firebase.auth();

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
