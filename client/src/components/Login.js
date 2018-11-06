import React from "react";
import { Button, Modal, ModalHeader, ModalBody } from "reactstrap";
import axios from "axios";

// CSS
import "../css/Login.css";

// Login/sign up ready styles
const readyStyles = {
    borderColor: "limeGreen",
    boxShadow: "0 0 2px 2px limeGreen"
  },
  // Login / sign up NOT ready styles
  notReadyStyles = {
    borderColor: "red",
    boxShadow: "0 0 2px 2px red"
  },
  errorStyles = {
    color: "red"
  };

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      login: true,
      create: false,
      name: "",
      username: "",
      password: "",
      passwordCheck: "",
      readyToLogin: false,
      readyToSignUp: false,
      loginError: null
    };

    this.toggle = this.toggle.bind(this);
    this.selectLogin = this.selectLogin.bind(this);
    this.selectCreate = this.selectCreate.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSignUp = this.handleSignUp.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
    this.handleInputClear = this.handleInputClear.bind(this);
  }

  componentDidUpdate(prevProps, prevState) {
    const namePattern = /^[a-z]{1,20}(\s[a-z]{1,20}){0,5}$/i,
      usernamePattern = /^[a-z1-9_-]{4,24}$/i,
      passwordPattern = /^[^:;,\s]{6,24}$/;
    let readyToLogin, readyToSignUp;
    if (
      usernamePattern.test(this.state.username.trim()) && 
      passwordPattern.test(this.state.password)
    ) {
      readyToLogin = true;
      if (
        namePattern.test(this.state.name.trim()) &&
        this.state.password === this.state.passwordCheck
      ) {
        readyToSignUp = true;
      }
    } else {
      readyToLogin = false;
      readyToSignUp = false;
    }
    if (this.state.readyToLogin !== readyToLogin) this.setState(() => ({readyToLogin}));
    if (this.state.readyToSignUp !== readyToSignUp) this.setState(() => ({readyToSignUp}));
  }

  toggle() {    
    if (
      this.state.name === "" &&
      this.state.username === "" &&
      this.state.password === "" &&
      this.state.passwordCheck === ""
    ) {
      this.setState((prevState) => ({
        modal: !prevState.modal
      }));
    }
  }

  selectLogin() {
    this.setState({
      login: true,
      create: false
    });
  }

  selectCreate() {
    this.setState({
      login: false,
      create: true
    });
  }

  handleInputChange(e) {
    const {name, value} = e.target;
    this.setState(() => ({
      [name]: value
    }));
  }

  handleInputClear() {
    this.setState((prevState) => ({
      name: "",
      username: "",
      password: "",
      passwordCheck: "",
      loginError: null,
      modal: !prevState.modal
    }));
  }

  handleSignUp(e) {
    e.preventDefault();
    const user = {
      name: this.state.name.trim(),
      username: this.state.username.trim(),
      password: this.state.password
    };
    axios({
      url: "/users/signUp",
      method: "POST",
      data: user
    })
    .then((data) => {
      const {data: user} = data;
      this.setState((prevState) => ({
        name: "",
        username: "",
        password: "",
        passwordCheck: "",
        modal: !prevState.modal
      }));
      this.props.handleUserLogin(user);
    })
    .catch((err) => {
      console.log(err);
    });
  }

  handleLogin(e) {
    e.preventDefault();
    const user = {
      username: this.state.username,
      password: this.state.password
    };
    axios({
      url: "/users/login",
      method: "POST",
      data: user
    })
    .then((data) => {
      const {data: user} = data;
      this.setState((prevState) => ({
        username: "",
        password: "",
        loginError: null,
        modal: !prevState.modal
      }));
      this.props.handleUserLogin(user);
    })
    .catch(() => {
      this.setState(() => ({
        loginError: "Invalid Username and/or Password!"
      }));
    });
  }

  render() {
    const namePattern = /^[a-z]{1,20}(\s[a-z]{1,20}){0,5}$/i,
      usernamePattern = /^[a-z1-9_-]{4,24}$/i,
      passwordPattern = /^[^:;,\s]{6,24}$/;
    
    const login = this.state.login;
    const create = this.state.create;
    let inputBody;

    if (login === true && create === false) {
      inputBody = (
        <ModalBody selectLogin={this.selectLogin}>
          <form onSubmit={this.handleLogin}>
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <input
                style={usernamePattern.test(this.state.username.trim()) ? readyStyles : notReadyStyles}
                type="text"
                className="form-control animated fadeIn"
                id="username"
                placeholder="alex-doe1234"
                name="username"
                value={this.state.username}
                onChange={this.handleInputChange}
                required
              />
              <label htmlFor="password">Password</label>
              <input
                style={passwordPattern.test(this.state.password) ? readyStyles : notReadyStyles}
                type="password"
                className="form-control animated fadeIn"
                id="password"
                name="password"
                value={this.state.password}
                onChange={this.handleInputChange}
                required
              />
              <br />
              <Button 
                type="submit" 
                color="primary"
                disabled={!this.state.readyToLogin}
              >
                Login
              </Button>
            </div>
          </form>
        </ModalBody>
      );
    } else if (login === false && create === true) {
      inputBody = (
        <ModalBody selectCreate={this.selectCreate}>
          <form onSubmit={this.handleSignUp}>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                style={namePattern.test(this.state.name.trim()) ? readyStyles : notReadyStyles}
                type="text"
                className="form-control animated flipInX"
                id="name"
                placeholder="Alex Doe"
                name="name"
                value={this.state.name}
                onChange={this.handleInputChange}
                required
              />
              <label htmlFor="username">Username</label>
              <input
                style={usernamePattern.test(this.state.username.trim()) ? readyStyles : notReadyStyles}
                type="text"
                className="form-control animated flipInX"
                id="username"
                placeholder="alex-doe1234"
                name="username"
                value={this.state.username}
                onChange={this.handleInputChange}
                required
              />
              <label htmlFor="password">Password</label>
              <input
                style={passwordPattern.test(this.state.password) ? readyStyles : notReadyStyles}
                type="password"
                className="form-control animated flipInX"
                id="password"
                name="password"
                value={this.state.password}
                onChange={this.handleInputChange}
                required
              />
              <label htmlFor="password">Re-enter Password</label>
              <input
                style={this.state.password === this.state.passwordCheck ? readyStyles : notReadyStyles}
                type="password"
                className="form-control animated flipInX"
                id="passwordCheck"
                name="passwordCheck"
                value={this.state.passwordCheck}
                onChange={this.handleInputChange}
                required
              />
              <br />
              <Button 
                type="submit" 
                color="primary"
                onClick={this.toggle}
                disabled={!this.state.readyToSignUp}
              >
                Create
              </Button>
            </div>
          </form>
        </ModalBody>
      );
    }

    return (
      <div>
        <Button color="primary" onClick={this.toggle}>
          {this.props.buttonLabel}
          Login
        </Button>
        <Modal
          isOpen={this.state.modal}
          toggle={this.toggle}
          className={this.props.className}
          id="login-modal"
        >
          <ModalHeader 
            toggle={this.handleInputClear}
            style={errorStyles}
          >
            {this.state.loginError}
          </ModalHeader>
          <div className="row">
            <div className="col">
              <Button
                color="light"
                className="login-or-create-btn"
                size="lg"
                block
                onClick={this.selectLogin}
                active={this.state.login}
              >
                Sign In
              </Button>
            </div>
            <div className="col">
              <Button
                color="light"
                className="login-or-create-btn"
                size="lg"
                block
                onClick={this.selectCreate}
                active={this.state.create}
              >
                Sign Up
              </Button>
            </div>
          </div>
          {inputBody}
        </Modal>
      </div>
    );
  }
}

export default Login;
