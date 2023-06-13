import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./css/Global.scss";
import "./css/balloon.min.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
