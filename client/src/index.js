import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./css/index.css";
import "./css/balloon.min.css";
import LogRocket from 'logrocket';

ReactDOM.render(<App />, document.querySelector("#root"));
LogRocket.init('d6pvgs/zephyr-node');