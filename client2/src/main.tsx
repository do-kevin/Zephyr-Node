import React, { lazy } from "react";
import ReactDOM from "react-dom/client";
import App from "src/app/App.tsx";
import "./main.css";

if (process.env.NODE_ENV === "development") {
  const { worker } = await import("./tests/mocks/browser");
  worker.start();
}

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
