import React from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

// CSS
import "../css/Login.css";

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      login: true,
      create: false
    };

    this.toggle = this.toggle.bind(this);
    this.selectLogin = this.selectLogin.bind(this);
    this.selectCreate = this.selectCreate.bind(this);
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

  render() {
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
        >
          <ModalHeader toggle={this.toggle}></ModalHeader>
          <div className="row">
            <div className="col">
              <Button 
                color="light"
                className="login-or-create-btn" 
                size="lg" 
                block 
                onClick={this.selectLogin}
                active>
                Sign In
              </Button>
            </div>
            <div className="col">
              <Button 
                color="light"
                className="login-or-create-btn"  
                size="lg" 
                block 
                onClick={this.selectCreate}>
                Sign Up
              </Button>
            </div>
          </div>
          <ModalBody selectLogin={this.selectLogin}>
            <form>
              <div className="form-group">
                <label htmlFor="username">Username</label>
                <input
                  type="text"
                  className="form-control"
                  id="username"
                  placeholder="alex-doe1234"
                />
                <label htmlFor="password">Password</label>
                <input type="password" className="form-control" id="password" />
                <br />
                <Button color="primary" onClick={this.toggle}>
                  Login
                </Button>
              </div>
            </form>
          </ModalBody>
          <ModalBody selectCreate={this.selectCreate}>
            <form>
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  placeholder="Alex Doe"
                />
                <label htmlFor="username">Username</label>
                <input
                  type="text"
                  className="form-control"
                  id="username"
                  placeholder="alex-doe1234"
                />
                <label htmlFor="password">Password</label>
                <input type="password" className="form-control" id="password" />
                <label htmlFor="password">Re-enter Password</label>
                <input type="password" className="form-control" id="password" />
                <br />
                <Button color="primary" onClick={this.toggle}>
                  Create
                </Button>
              </div>
            </form>
          </ModalBody>
          <ModalFooter>
            <Button color="secondary" onClick={this.toggle}>
              Close
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default Login;
