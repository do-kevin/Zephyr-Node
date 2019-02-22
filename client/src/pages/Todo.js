import React from "react";
import {
  Card,
  CardBody,
  ListGroup,
  ListGroupItem,
  Modal,
  ModalHeader,
  ModalBody,
  Form
} from "reactstrap";
import axios from "axios";
import moment from "moment";
import DOMPurify from "dompurify";
import styled from 'styled-components';

import Sidebar from "../components/Sidebar";

import "../css/Todo.scss";

const Menu = styled.menu`
  #sidebar {
    top: 0;
  }
  .sidebar-nav__link--todo {
    background: hsla(214, 100%, 96%, 1);
    box-shadow: 0px 2px 1px #888, 0px -2px 1px #888;
    border-left: 5px solid hsla(220, 15%, 23%, 1);
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
      time_date: moment().format("ddd, MMMM, Do YYYY")
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
              Creating to-do
            </ModalHeader>
            <ModalBody>
              <Form onSubmit={this.saveToDo}>
                <textarea
                  className="todo-input"
                  type="textarea"
                  name="text"
                  onChange={this.handleChange}
                  maxLength="136"
                />
                <hr />
                <p className={this.state.validationClass} style={{width: '214px !important'}}>
                  Please fill in the required field.
                </p>
                <button
                  className="todo-btn todo-btn--primary push-right"
                  type="submit"
                  value="Submit"
                >
                  Save task
                </button>{" "}
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
              Edit task
            </ModalHeader>
            <ModalBody>
              <Form onSubmit={this.saveEdit}>
                <textarea
                  type="textarea"
                  className="todo-input"
                  name="text"
                  value={this.state.task}
                  onChange={this.handleChange}
                  maxLength="126"
                />
                <hr />
                <p className={this.state.validationClass}>
                  Please fill in the required field.
                </p>
                <button
                  type="submit"
                  value="Submit"
                  className="todo-btn todo-btn--primary push-right"
                >
                  Save changes
                </button>{" "}
              </Form>
            </ModalBody>
          </Modal>
        </div>
      );
    }

    return (
      <div>
        <Menu><Sidebar handleUserLogout={this.props.handleUserLogout} /></Menu>
        <main className="container">
          {/* Logout redirection */}
          {this.props.handleUserRedirect()}
          {modal}
          <p style={{color: 'hsla(180, 85%, 35%, 1)', fontWeight: 500}}className="time_date">{this.state.time_date}</p>
          <Card className="text-center todo-list">
            <CardBody>
              <button
                className="todo-btn todo-btn--dark"
                onClick={this.createToDo}
                name="create"
                style={{marginBottom: '25px'}}
              >
                <i className="fas fa-plus" /> Add to-do
              </button>
              <div className="card-text">
                {/************* Display Existing Tasks Start *************/}
                <div>
                  {this.state.todos.map(todo => {
                      console.log(todo.id);
                    return (
                      <ListGroup>
                        <ListGroupItem className="animated flipInX todo-list__item" key={todo.id}>
                          <span className="task">{todo.item}</span>
                          <span className="push-right">
                            <button
                              className="edit-task-btn"
                              style={{border: "none"}}
                              onClick={() => this.editToDo(todo.item, todo.id)}
                              name="edit"
                            >
                              <i className="fas fa-edit" /> <span className="edit-span">Edit task</span>
                            </button>{" "}
                            <button
                              className="check-btn"
                              onClick={() => this.completeToDo(todo.id)}
                              name="complete"
                            >
                              <i className="fas fa-check" />
                            </button>
                          </span>
                        </ListGroupItem>
                      </ListGroup>
                    );
                  })}
                </div>
                {/************* Display Existing Tasks End *************/}
              </div>
              {/************* Create Task/Profile Buttons *************/}
            </CardBody>
          </Card>
        </main>
      </div>
    );
  }
}

export default Todo;
