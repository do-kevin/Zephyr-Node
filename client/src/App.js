import React, { Component } from "react";

// Pages
// import Home from "./pages/Home";
import PlayCards from "./pages/PlayCards";

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
        <PlayCards />
      </div>
    );
  }
}

export default App;
