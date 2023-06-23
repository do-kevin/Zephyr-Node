import React from "react";
import ReactDOM from "react-dom/client";
import "reflect-metadata";
import App from "src/app/App.tsx";
import "./main.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
