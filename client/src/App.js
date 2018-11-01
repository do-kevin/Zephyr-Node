import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

// Pages
import Home from "./pages/Home";
import Reminder from "./pages/Reminder";
import Profile from "./pages/Profile";
import Todo from "./pages/Todo";
import ChooseDeck from "./pages/ChooseDeck";
import PlayCards from "./pages/PlayCards";


// Components
// import Sidebar from "./components/Sidebar";

// CSS
import "./css/App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null
    };
  }
  render() {
    return (
      <Router>
        <div>
          <Route exact path="/" component={Home} user={this.state.user} />
          <Route exact path="/reminder" component={Reminder} user={this.state.user} />
          <Route exact path="/profile" component={Profile} user={this.state.user} />
          <Route exact path="/todo" component={Todo} user={this.state.user} />
          <Route exact path="/choose" component={ChooseDeck} user={this.state.user} />
          <Route exact path="/deck" component={PlayCards} user={this.state.user} />
        </div>
      </Router>
    );
  }
}

export default App;
