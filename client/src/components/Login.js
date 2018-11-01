import React from "react";
import { Button, Modal, ModalHeader, ModalBody } from "reactstrap";
import axios from "axios";

// CSS
import "../css/Login.css";

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
      passwordCheck: ""
    };

    this.toggle = this.toggle.bind(this);
    this.selectLogin = this.selectLogin.bind(this);
    this.selectCreate = this.selectCreate.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSignUp = this.handleSignUp.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
  }

  toggle() {
    this.setState({
      modal: !this.state.modal
    });
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

  handleSignUp(e) {
    e.preventDefault();
    // TODO: add sign up functionality for new users
    const user = {
      name: this.state.name,
      username: this.state.username,
      password: this.state.password
    };
    axios({
      url: "/users/signUp",
      method: "POST",
      data: user
    })
    .then((data) => {
      console.log(data);
    })
    .catch((err) => {
      console.log(err);
    });
  }

  handleLogin(e) {
    e.preventDefault();
    // TODO: add login functionality for existing users
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
      console.log(data);
    })
    .catch((err) => {
      console.log(err);
    });
  }

  render() {
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
                type="password"
                className="form-control animated fadeIn"
                id="password"
                name="password"
                value={this.state.password}
                onChange={this.handleInputChange}
                required
              />
              <br />
              <Button type="submit" color="primary" onClick={this.toggle}>
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
                type="password"
                className="form-control animated flipInX"
                id="passwordCheck"
                name="passwordCheck"
                value={this.state.passwordCheck}
                onChange={this.handleInputChange}
                required
              />
              <br />
              <Button type="submit" color="primary" onClick={this.toggle}>
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
          <ModalHeader toggle={this.toggle} />
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
