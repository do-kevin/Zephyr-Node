import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import axios from "axios";

// Pages
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Reminder from "./pages/Reminder";
import Todo from "./pages/Todo";
import ChooseDeck from "./pages/ChooseDeck";
import PlayCards from "./pages/PlayCards";
import Notes from "./pages/Notes";

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
    this.handleUserLogin = this.handleUserLogin.bind(this);
    this.handleUserLogout = this.handleUserLogout.bind(this);
  }

  componentDidMount() {
    const userStr = localStorage.getItem("user");
    try {
      const user = JSON.parse(userStr);
      if (user) {
        this.setState(() => ({user}));
      }
    } catch (err) {
      console.log(err.message);
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.user !== this.state.user) {
      const userStr = JSON.stringify(this.state.user);
      localStorage.setItem("user", userStr);
    }
  }

  handleUserLogin(user) {
    this.setState(() => ({user}));
  }

  handleUserLogout() {
    axios({
      url: "/users/logout",
      method: "GET"
    })
    .then(() => {
      document.body.style.marginLeft = "0px";
      this.setState(() => ({user: null}));
    })
    .catch((err) => {
      console.log(err);
    });
  }
  
  render() {
    return (
      <Router>
        <div>
          <Route 
            exact path="/" 
            render={(props) => <Home {...props} 
              user={this.state.user}
              handleUserLogin={this.handleUserLogin} />}
          />
          <Route 
            exact path="/reminder"
            render={(props) => <Reminder {...props}
              user={this.state.user}
              handleUserLogout={this.handleUserLogout} />}
          />
          <Route 
            exact path="/profile" 
            render={(props) => <Profile {...props} 
              user={this.state.user}
              handleUserLogout={this.handleUserLogout} />}
          />
          <Route 
            exact path="/todo" 
            render={(props) => <Todo {...props}
              user={this.state.user}
              handleUserLogout={this.handleUserLogout} />}
          />            
          <Route 
            exact path="/choose" 
            render={(props) => <ChooseDeck {...props}
              user={this.state.user}
              handleUserLogout={this.handleUserLogout} />}
          />
          <Route 
            exact path="/deck" 
            render={(props) => <PlayCards {...props}
              user={this.state.user}
              handleUserLogout={this.handleUserLogout} />}
          />
            <Route 
            exact path="/notes" 
            render={(props) => <Notes {...props}
            user={this.state.user}
            handleUserLogout={this.handleUserLogout} />}
          />
        </div>
      </Router>
    );
  }
}

export default App;
