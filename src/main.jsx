import React from "react";
import ReactDOM from "react-dom/client";
import "./storagePolyfill.js"; // window.storage をブラウザ用に差し替える(App.jsxより先に読み込む)
import App from "./App.jsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
