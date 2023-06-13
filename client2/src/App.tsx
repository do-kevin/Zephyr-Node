import { Component } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  redirect as _redirect,
} from "react-router-dom";
import axios from "axios";
import GithubIcon from "./img/github.png";

// Pages
import Home from "./pages/Home.jsx";
import Profile from "./pages/Profile.jsx";
import Reminder from "./pages/Reminder.jsx";
import Todo from "./pages/Todo.jsx";
import Decks from "./pages/Decks.jsx";
import Flashcards from "./pages/Flashcards.jsx";
import Notes from "./pages/Notes.jsx";
import Settings from "./pages/Setting.jsx";

type AppProps = {
  user: any;
  redirect: boolean;
  paidDyno: boolean;
};

type AppState = {
  user: any;
  redirect: boolean;
  paidDyno: boolean;
};

class App extends Component<AppProps, AppState> {
  constructor(props: AppProps) {
    super(props);
    this.state = {
      user: null,
      redirect: false,
      paidDyno: false,
    };
  }

  componentDidMount() {
    const userStr = localStorage.getItem("user") || "",
      redirectStr = localStorage.getItem("redirect") || "";

    console.log(userStr);
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

  componentDidUpdate(prevProps: AppProps, prevState: AppState) {
    if (prevState.user !== this.state.user) {
      const userStr = JSON.stringify(this.state.user);
      localStorage.setItem("user", userStr);
    }
    if (prevState.redirect !== this.state.redirect) {
      const redirectStr = JSON.stringify(this.state.redirect);
      localStorage.setItem("redirect", redirectStr);
    }
  }

  handleUserLogin = (user: unknown) => {
    this.setState(() => ({ user }));
  };

  handleUserLogout = () => {
    axios({
      url: "/api/users/logout",
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

  // On top of react-router-dom migration, this code block was causing blank page
  handleUserRedirect = () => {
    if (this.state.redirect) {
      this.setState(() => ({ redirect: false }));
      document.body.style.marginLeft = "0px";
      // return <Redirect to={"/"} />;
      _redirect("/");
    }
  };

  render() {
    return (
      <main>
        <div style={{ clear: "both" }}>
          <Router>
            <Routes>
              <Route
                path="/"
                element={
                  <Home
                    user={this.state.user}
                    handleUserLogin={this.handleUserLogin}
                    handleUserRedirect={this.handleUserRedirect}
                  />
                }
              />
              <Route
                path="/profile"
                element={
                  <Profile
                    user={this.state.user}
                    handleUserLogout={this.handleUserLogout}
                    handleUserRedirect={this.handleUserRedirect}
                  />
                }
              />
              {/* <Route
                path="/reminder"
                element={
                  <Reminder
                    user={this.state.user}
                    handleUserLogout={this.handleUserLogout}
                    handleUserRedirect={null}
                  />
                }
              /> */}
              {/* <Route
                element={
                  <Todo
                    user={this.state.user}
                    handleUserLogout={this.handleUserLogout}
                    handleUserRedirect={null}
                  />
                }
              /> */}
              {/* <Route
                path="/decks"
                element={
                  <Decks
                    user={this.state.user}
                    handleUserLogout={this.handleUserLogout}
                    handleUserRedirect={null}
                  />
                }
              /> */}
              {/* <Route
                path="/deck"
                element={
                  <Flashcards
                    user={this.state.user}
                    handleUserLogout={this.handleUserLogout}
                    handleUserRedirect={null}
                  />
                }
              /> */}
              {/* <Route
                path="/notes"
                element={
                  <Notes
                    user={this.state.user}
                    handleUserLogout={this.handleUserLogout}
                    handleUserRedirect={null}
                  />
                }
              /> */}
              {/* <Route
                path="/settings"
                element={
                  <Settings
                    user={this.state.user}
                    handleUserLogout={this.handleUserLogout}
                    handleUserRedirect={null}
                  />
                }
              /> */}
            </Routes>
          </Router>
        </div>

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
