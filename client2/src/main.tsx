// import "bootstrap/dist/css/bootstrap.min.css";
import "./assets/css/custom.css";
import "bootstrap-icons/font/bootstrap-icons.min.css";
import "./main.scss";

import React from "react";
import ReactDOM from "react-dom/client";
import App from "src/app/App.tsx";

if (process.env.NODE_ENV === "development") {
  const { worker } = await import("./tests/mocks/browser");
  worker.start();
}

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
