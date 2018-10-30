import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

// Pages
import Home from "./pages/Home";
import Profile from "./pages/Profile";

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
    </div>
  </Router>
);

export default App;
