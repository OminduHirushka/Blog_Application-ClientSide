import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import "antd/dist/reset.css";
import "./index.css";
import { Provider } from "react-redux";
import { store } from "./state/store/store.js";
import Toast from "./components/toast/Toast.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <Toast />
        <App />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);
