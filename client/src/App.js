import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Route,
  redirect as _redirect,
} from "react-router-dom";
import axios from "axios";
import GithubIcon from "./img/github.png";

// Pages
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Reminder from "./pages/Reminder";
import Todo from "./pages/Todo";
import Decks from "./pages/Decks";
import Flashcards from "./pages/Flashcards";
import Notes from "./pages/Notes";
import Settings from "./pages/Setting";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      redirect: false,
      paidDyno: false,
    };
  }

  componentDidMount() {
    const userStr = localStorage.getItem("user"),
      redirectStr = localStorage.getItem("redirect");
    try {
      const user = JSON.parse(userStr);
      if (user) this.setState(() => ({ user }));
    } catch (err) {
      console.log(err);
    }
    try {
      const redirect = JSON.parse(redirectStr);
      if (redirect) this.setState(() => ({ redirect }));
    } catch (err) {
      console.log(err);
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.user !== this.state.user) {
      const userStr = JSON.stringify(this.state.user);
      localStorage.setItem("user", userStr);
    }
    if (prevState.redirect !== this.state.redirect) {
      const redirectStr = JSON.stringify(this.state.redirect);
      localStorage.setItem("redirect", redirectStr);
    }
  }

  handleUserLogin = (user) => {
    this.setState(() => ({ user }));
  };

  handleUserLogout = () => {
    axios({
      url: "/users/logout",
      method: "GET",
    })
      .then(() => {
        this.setState(() => ({ user: null, redirect: true }));
        document.body.style.marginLeft = "0px";
      })
      .catch((err) => {
        console.log(err);
      });
  };

  handleUserRedirect = () => {
    if (this.state.redirect) {
      this.setState(() => ({ redirect: false }));
      document.body.style.marginLeft = "0px";
      return _redirect("/");
    }
  };

  render() {
    return (
      <main>
        <Router>
          <div style={{ clear: "both" }}>
            <Route
              path="/"
              render={(props) => (
                <Home
                  {...props}
                  user={this.state.user}
                  handleUserLogin={this.handleUserLogin}
                  handleUserRedirect={this.handleUserRedirect}
                />
              )}
            />
            <Route
              path="/reminder"
              render={(props) => (
                <Reminder
                  {...props}
                  user={this.state.user}
                  handleUserLogout={this.handleUserLogout}
                  handleUserRedirect={this.handleUserRedirect}
                />
              )}
            />
            <Route
              path="/profile"
              render={(props) => (
                <Profile
                  {...props}
                  user={this.state.user}
                  handleUserLogout={this.handleUserLogout}
                  handleUserRedirect={this.handleUserRedirect}
                />
              )}
            />
            <Route
              path="/todo"
              render={(props) => (
                <Todo
                  {...props}
                  user={this.state.user}
                  handleUserLogout={this.handleUserLogout}
                  handleUserRedirect={this.handleUserRedirect}
                />
              )}
            />
            <Route
              path="/decks"
              render={(props) => (
                <Decks
                  {...props}
                  user={this.state.user}
                  handleUserLogout={this.handleUserLogout}
                  handleUserRedirect={this.handleUserRedirect}
                />
              )}
            />
            <Route
              path="/deck"
              render={(props) => (
                <Flashcards
                  {...props}
                  user={this.state.user}
                  handleUserLogout={this.handleUserLogout}
                  handleUserRedirect={this.handleUserRedirect}
                />
              )}
            />
            <Route
              path="/notes"
              render={(props) => (
                <Notes
                  {...props}
                  user={this.state.user}
                  handleUserLogout={this.handleUserLogout}
                  handleUserRedirect={this.handleUserRedirect}
                />
              )}
            />
            <Route
              path="/settings"
              render={(props) => (
                <Settings
                  {...props}
                  user={this.state.user}
                  handleUserLogout={this.handleUserLogout}
                  handleUserRedirect={this.handleUserRedirect}
                />
              )}
            />
          </div>
        </Router>
        <footer className="custom-footer">
          <a
            className="github-btn"
            href="https://github.com/do-kevin/Project-Three"
            target="_blank"
            rel="noopener noreferrer"
            data-balloon="GitHub repository"
            data-balloon-pos="left"
          >
            <img
              className="github-btn__logo"
              src={GithubIcon}
              alt="github logo"
            />
          </a>{" "}
        </footer>
      </main>
    );
  }
}

export default App;
