import React from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false
    };

    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState({
      modal: !this.state.modal
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
          <ModalHeader toggle={this.toggle}>Login</ModalHeader>
          <ModalBody>
            <form>
              <div class="form-group">
                <label for="username">Username</label>
                <input
                  type="text"
                  class="form-control"
                  id="username"
                  placeholder="mysteryperson123"
                />
                <label for="password">Password</label>
                <input type="password" class="form-control" id="password" />
              </div>
            </form>
          </ModalBody>
          <ModalBody>
            <form>
              <div class="form-group">
                <label for="name">Name</label>
                <input
                  type="text"
                  class="form-control"
                  id="name"
                  placeholder="Alex Doe"
                />
                <label for="username">Username</label>
                <input
                  type="text"
                  class="form-control"
                  id="username"
                  placeholder="mysteryperson123"
                />
                <label for="password">Password</label>
                <input type="password" class="form-control" id="password" />
                <label for="password">Re-enter Password</label>
                <input type="password" class="form-control" id="password" />
              </div>
            </form>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.toggle}>
              Sign In
            </Button>{" "}
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
