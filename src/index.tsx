import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import ToastNotification from "./component/ToastNotification";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <ToastNotification />
    <App />
  </React.StrictMode>
);

