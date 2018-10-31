import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

// Pages
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Todo from "./pages/Todo";

// Components
import Sidebar from "./components/Sidebar";

// CSS
import "./css/App.css";

const App = () => (
  <Router>
    <div className="container">
      <Sidebar />
      <Route exact path="/" component={Home} />
      <Route exact path="/profile" component={Profile} />
      <Route exact path="/todo" component={Todo} />
    </div>
  </Router>
);

export default App;
