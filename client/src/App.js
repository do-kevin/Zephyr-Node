import React, { Component } from "react";

// Pages
import Home from "./pages/Home";
import DecksTest from "./pages/Decks-test";

// Components
// import Sidebar from "./components/Sidebar";

// CSS
import "./css/App.css";

class App extends Component {
  render() {
    return (
      <div>
        {/* <Sidebar />
        <Home /> */}
        <DecksTest />
      </div>
    );
  }
}

export default App;
