import React from "react";
import {
  Card,
  CardBody,
  CardTitle,
  Button,
  ListGroup,
  ListGroupItem,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  Input
} from "reactstrap";
import axios from "axios";
import moment from "moment";
import DOMPurify from "dompurify";
import styled from 'styled-components';

import Sidebar from "../components/Sidebar";

import "../css/Todo.css";

const Menu = styled.menu`
  #sidebar {
    top: 0;
  }
  .sidebar-nav__link--todo {
    background: hsl(211, 100%, 97%);
    box-shadow: 0px 2px 1px #888, 0px -2px 1px #888;
  }
  .sidebar-nav__link--todo .sidebar-nav__text {
    color: black;
  }
`;

class Todo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      task: "",
      taskId: 0,
      todos: [],
      modal: false,
      modalMode: "",
      validationClass: "novalidation",
      backdrop: "static",
      time_date: moment().format("ddd, MMMM Do YYYY, h:mm:ss a")
    };
    this.toggle = this.toggle.bind(this);
  }

  componentDidMount() {
    // console.log("To-do component mounted.")
    this.getTodos();
  }

  // Show modal
  toggle() {
    this.setState({
      modal: !this.state.modal,
      validationClass: "novalidation"
    });
  }

  // Get to-do's from database to display onto the page
  getTodos = () => {
    const id = JSON.parse(localStorage.getItem("user")).id;
    axios.get("/todos/users/" + id).then(res => {
      // console.log(res.data);
      this.setState({
        todos: res.data
      });
    });
  };

  // Delete task from db when task is completed
  completeToDo = id => {
    // console.log("Attempt to complete a task.");
    axios.delete("/todos/" + id).then(res => {
      // console.log(res)
      this.getTodos();
    });
  };

  // Prompt modal that creates task
  createToDo = () => {
    this.setState({
      modalMode: "create",
      task: ""
    });
    this.toggle();
  };

  editToDo = (task, id) => {
    this.setState({
      modalMode: "edit",
      task: task,
      taskId: id
    });
    this.toggle();
  };

  // Change item state to text input
  handleChange = event => {
    this.setState({
      task: DOMPurify.sanitize(event.target.value)
    });
  };

  // Save new task
  saveToDo = event => {
    event.preventDefault();
    // console.log("Attempt to save new task.")
    // console.log(this.state.task)
    if (this.state.task !== "") {
      this.setState({
        modal: !this.state.modal
      });
      let toDoObj = {
        item: this.state.task,
        date: moment().format("YYYY-MM-DD HH:mm"),
        done: false,
        userId: JSON.parse(localStorage.getItem("user")).id
      };
      axios.post("/todos/" + toDoObj.userId, toDoObj).then(res => {
        if (res) {
          // console.log(res.data)
          // console.log("Task '" + this.state.task + "' was saved");
          this.setState({
            task: ""
          });
          this.getTodos();
        } else {
          alert("Error: task was not saved successfully.");
          this.getTodos();
        }
      });
    } else {
      // console.log("Invalid new task input.")
      this.setState({
        validationClass: "validation"
      });
    }
  };

  // Save edit to task
  saveEdit = (event, task, id) => {
    event.preventDefault();
    // console.log("Attempt to edit existing task.")
    if (this.state.task !== "") {
      this.setState({
        modal: !this.state.modal
      });
      axios
        .put("/todos/" + this.state.taskId, { item: this.state.task })
        .then(res => {
          if (res.data) {
            // console.log("Task was edited to '" + this.state.task + "'");
            this.getTodos();
          } else {
            alert("Error: task was not edited successfully.");
          }
        });
    } else {
      // console.log("Invalid edit.")
      this.setState({
        validationClass: "validation"
      });
    }
  };

  render() {
    const closeBtn = (
      <button className="close" onClick={this.toggle}>
        &times;
      </button>
    );
    let modal;

    // Modal to create a new task
    if (this.state.modal === true && this.state.modalMode === "create") {
      modal = (
        <div>
          <Modal
            isOpen={this.state.modal}
            toggle={this.toggle}
            className={this.props.className}
            centered={true}
            backdrop={this.state.backdrop}
          >
            <ModalHeader toggle={this.toggle} close={closeBtn}>
              New Task
            </ModalHeader>
            <ModalBody>
              <Form onSubmit={this.saveToDo}>
                <Input
                  type="textarea"
                  name="text"
                  onChange={this.handleChange}
                  maxLength="130"
                />
                <hr />
                <p className={this.state.validationClass}>
                  Please fill in required field.
                </p>
                <Button
                  outline
                  color="info"
                  type="submit"
                  value="Submit"
                  className="pull-right"
                >
                  Add
                </Button>{" "}
              </Form>
            </ModalBody>
          </Modal>
        </div>
      );
    }

    // Modal to edit an existing task
    if (this.state.modal === true && this.state.modalMode === "edit") {
      modal = (
        <div>
          <Modal
            isOpen={this.state.modal}
            toggle={this.toggle}
            className={this.props.className}
            centered={true}
            backdrop={this.state.backdrop}
          >
            <ModalHeader toggle={this.toggle} close={closeBtn}>
              Edit Task
            </ModalHeader>
            <ModalBody>
              <Form onSubmit={this.saveEdit}>
                <Input
                  type="textarea"
                  name="text"
                  value={this.state.task}
                  onChange={this.handleChange}
                  maxLength="130"
                />
                <hr />
                <p className={this.state.validationClass}>
                  Please fill in required field.
                </p>
                <Button
                  outline
                  color="info"
                  type="submit"
                  value="Submit"
                  className="pull-right"
                >
                  Edit
                </Button>{" "}
              </Form>
            </ModalBody>
          </Modal>
        </div>
      );
    }

    return (
      <div>
        <Menu><Sidebar handleUserLogout={this.props.handleUserLogout} /></Menu>
        <div className="container">
          {/* Logout redirection */}
          {this.props.handleUserRedirect()}
          {modal}
          <p className="time_date">{this.state.time_date}</p>
          <Card className="text-center">
            <CardBody>
              <CardTitle>To-do List</CardTitle>
              <div className="card-text">
                {/************* Display Existing Tasks Start *************/}
                <div>
                  {this.state.todos.map(todo => {
                      console.log(todo.id);
                    return (
                      <ListGroup>
                        <ListGroupItem className="animated flipInX" key={todo.id}>
                          <span className="task">{todo.item}</span>
                          <span className="pull-right">
                            <Button
                              outline
                              color="info"
                              onClick={() => this.editToDo(todo.item, todo.id)}
                              name="edit"
                            >
                              <i className="fas fa-edit" />
                            </Button>{" "}
                            <Button
                              outline
                              color="info"
                              onClick={() => this.completeToDo(todo.id)}
                              name="complete"
                            >
                              <i className="fas fa-check" />
                            </Button>
                          </span>
                        </ListGroupItem>
                      </ListGroup>
                    );
                  })}
                </div>
                {/************* Display Existing Tasks End *************/}
              </div>
              {/************* Create Task/Profile Buttons *************/}
              <Button
                outline
                color="info"
                onClick={this.createToDo}
                name="create"
              >
                Create Task
              </Button>
            </CardBody>
          </Card>
        </div>
      </div>
    );
  }
}

export default Todo;
