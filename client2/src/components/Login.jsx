import React from "react";
import { Button, Modal, ModalHeader, ModalBody } from "reactstrap";
import axios from "axios";
import styled from "styled-components";

// CSS
import "../css/Login.scss";

// Login/sign up ready styles
const readyStyles = {
    borderRight: "5px solid hsla(123, 61%, 50%, 1)",
  },
  // Login / sign up NOT ready styles
  notReadyStyles = {
    borderRight: "5px solid hsla(3, 100%, 50%, 1)",
  },
  errorStyles = {
    color: "red",
  };

const Tab = styled.div`
  .modal-body {
    border-bottom-left-radius: 5px;
    border-bottom-right-radius: 5px;
    background: hsla(220, 17%, 80%, 1) !important;
  }
  .form-control {
    background: hsla(220, 20%, 98%, 1);
    border-top: 1px solid hsla(220, 17%, 61%, 1) !important;
    border-left: 1px solid hsla(220, 17%, 61%, 1) !important;
    border-bottom: 1px solid hsla(220, 17%, 61%, 1) !important;
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
    box-shadow: inset 0 0 7px hsla(220, 17%, 61%, 1);
  }
`;

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
      loginError: null,
    };
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
    if (this.state.readyToLogin !== readyToLogin)
      this.setState(() => ({ readyToLogin }));
    if (this.state.readyToSignUp !== readyToSignUp)
      this.setState(() => ({ readyToSignUp }));
  }

  toggle = () => {
    if (
      this.state.name === "" &&
      this.state.username === "" &&
      this.state.password === "" &&
      this.state.passwordCheck === ""
    ) {
      this.setState((prevState) => ({
        modal: !prevState.modal,
      }));
    }
  };

  selectLogin = () => {
    this.setState({
      login: true,
      create: false,
    });
  };

  selectCreate = () => {
    this.setState({
      login: false,
      create: true,
    });
  };

  handleInputChange = (e) => {
    const { name, value } = e.target;
    this.setState(() => ({
      [name]: value,
    }));
  };

  handleInputClear = () => {
    this.setState((prevState) => ({
      name: "",
      username: "",
      password: "",
      passwordCheck: "",
      loginError: null,
      modal: !prevState.modal,
    }));
  };

  handleSignUp = (e) => {
    e.preventDefault();
    const user = {
      name: this.state.name.trim(),
      username: this.state.username.trim(),
      password: this.state.password,
    };
    axios({
      url: "/api/users/signUp",
      method: "POST",
      data: user,
    })
      .then((data) => {
        const { data: user } = data;
        this.setState((prevState) => ({
          name: "",
          username: "",
          password: "",
          passwordCheck: "",
          modal: !prevState.modal,
        }));
        this.props.handleUserLogin(user);
      })
      .catch((err) => {
        this.setState(() => ({
          loginError: "Unable to Create, User May Already Exist",
        }));
      });
  };

  handleLogin = (e) => {
    e.preventDefault();
    const user = {
      username: this.state.username,
      password: this.state.password,
    };
    axios({
      url: "/api/users/login",
      method: "POST",
      data: user,
    })
      .then((data) => {
        const { data: user } = data;
        this.setState((prevState) => ({
          username: "",
          password: "",
          loginError: null,
          modal: !prevState.modal,
        }));
        this.props.handleUserLogin(user);
      })
      .catch(() => {
        this.setState(() => ({
          loginError: "Invalid Username and/or Password",
        }));
      });
  };

  render() {
    const namePattern = /^[a-z]{1,20}(\s[a-z]{1,20}){0,5}$/i,
      usernamePattern = /^[a-z1-9_-]{4,24}$/i,
      passwordPattern = /^[^:;,\s]{6,24}$/;

    const login = this.state.login;
    const create = this.state.create;
    let inputBody;

    if (login === true && create === false) {
      inputBody = (
        <Tab>
          <ModalBody>
            <form onSubmit={this.handleLogin}>
              <div className="form-group login-form">
                <label className="login-form__labels" htmlFor="username">
                  Username
                </label>
                <input
                  style={
                    usernamePattern.test(this.state.username.trim())
                      ? readyStyles
                      : notReadyStyles
                  }
                  type="text"
                  className="form-control animated fadeIn"
                  id="username"
                  name="username"
                  value={this.state.username}
                  onChange={this.handleInputChange}
                  required
                />
                <label className="login-labels" htmlFor="password">
                  Password
                </label>
                <input
                  style={
                    passwordPattern.test(this.state.password)
                      ? readyStyles
                      : notReadyStyles
                  }
                  type="password"
                  className="form-control animated fadeIn"
                  id="password"
                  name="password"
                  value={this.state.password}
                  onChange={this.handleInputChange}
                  required
                />
                <br />
                <button
                  className="login-form__btn"
                  type="submit"
                  color="success"
                  disabled={!this.state.readyToLogin}
                >
                  Login
                </button>
              </div>
            </form>
          </ModalBody>
        </Tab>
      );
    } else if (login === false && create === true) {
      inputBody = (
        <Tab>
          <ModalBody selectCreate={this.selectCreate}>
            <form onSubmit={this.handleSignUp}>
              <div className="form-group login-form">
                <label className="login-form__labels" htmlFor="name">
                  Name
                </label>
                <input
                  style={
                    namePattern.test(this.state.name.trim())
                      ? readyStyles
                      : notReadyStyles
                  }
                  type="text"
                  className="form-control animated flipInX"
                  id="name"
                  placeholder="Enter your name"
                  name="name"
                  value={this.state.name}
                  onChange={this.handleInputChange}
                  required
                />
                <label className="login-form__labels" htmlFor="username">
                  Username
                </label>
                <input
                  style={
                    usernamePattern.test(this.state.username.trim())
                      ? readyStyles
                      : notReadyStyles
                  }
                  type="text"
                  className="form-control animated flipInX"
                  id="username"
                  placeholder="Enter your username"
                  name="username"
                  value={this.state.username}
                  onChange={this.handleInputChange}
                  required
                />
                <label className="login-form__labels" htmlFor="password">
                  Password
                </label>
                <input
                  style={
                    passwordPattern.test(this.state.password) &&
                    this.state.password === this.state.passwordCheck
                      ? readyStyles
                      : notReadyStyles
                  }
                  type="password"
                  className="form-control animated flipInX"
                  id="password"
                  name="password"
                  placeholder="Enter your password"
                  value={this.state.password}
                  onChange={this.handleInputChange}
                  required
                />
                <label className="login-form__labels" htmlFor="password">
                  Confirm password
                </label>
                <input
                  style={
                    this.state.password === this.state.passwordCheck &&
                    this.state.passwordCheck.length > 0
                      ? readyStyles
                      : notReadyStyles
                  }
                  type="password"
                  className="form-control animated flipInX"
                  id="passwordCheck"
                  name="passwordCheck"
                  placeholder="Re-enter your password"
                  value={this.state.passwordCheck}
                  onChange={this.handleInputChange}
                  required
                />
                <br />
                <button
                  className="login-form__btn"
                  type="submit"
                  onClick={this.toggle}
                  disabled={!this.state.readyToSignUp}
                >
                  Create
                </button>
              </div>
            </form>
          </ModalBody>
        </Tab>
      );
    }

    return (
      <main>
        <button
          className="login-form__btn"
          color="primary"
          onClick={this.toggle}
          style={{ boxShadow: "0 0 5px hsla(220, 15%, 21%, 1)" }}
        >
          {this.props.buttonLabel}
          Login <i className="fas fa-sign-in-alt" />
        </button>
        <Modal
          isOpen={this.state.modal}
          toggle={this.toggle}
          className={this.props.className && "custom-modal"}
          id="login-modal"
        >
          <ModalHeader toggle={this.handleInputClear} style={errorStyles}>
            {this.state.loginError}
          </ModalHeader>
          <section className="row">
            <div className="col">
              <Button
                color="light"
                style={{ outline: "none", color: "hsla(220, 15%, 23%, 1)" }}
                className="login-form__tab-btn"
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
                style={{ outline: "none", color: "hsla(220, 15%, 23%, 1)" }}
                className="login-form__tab-btn"
                size="lg"
                block
                onClick={this.selectCreate}
                active={this.state.create}
              >
                Sign Up
              </Button>
            </div>
          </section>
          {inputBody}
        </Modal>
      </main>
    );
  }
}

export default Login;
