import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

// Pages
import Home from "./pages/Home";
import Reminder from "./pages/Reminder";
import Profile from "./pages/Profile";
// import Decks from "./pages/Decks";
import Todo from "./pages/Todo";
import PlayCards from "./pages/PlayCards";

// Components
// import Sidebar from "./components/Sidebar";

// CSS
import "./css/App.css";

class App extends Component {
  render() {
    return (
      <Router>
        <div>
            <Route exact path="/" component={Home}/>
            <Route exact path="/reminder" component={Reminder} />
            <Route exact path="/profile" component={Profile} />
            <Route exact path="/deck" component={PlayCards} />
        </div>
      </Router>
    );
  }
}

export default App;
