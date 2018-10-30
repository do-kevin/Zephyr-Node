import React, { Component } from "react";

// Pages
import Home from "./pages/Home";

// Components
import Sidebar from "./components/Sidebar";

// CSS
import "./css/App.css";

class App extends Component {
  render() {
    return (
      <div>
        <Sidebar />
        <Home />
      </div>
    );
  }
}

export default App;
