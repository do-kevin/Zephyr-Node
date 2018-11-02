import React from "react";
import {
    Card, CardBody, CardTitle, CardText, Button, ListGroup, ListGroupItem, Modal, ModalHeader, ModalBody, Form, Input
} from 'reactstrap';
import axios from "axios";
import moment from "moment";

// Components
import TimeDate from "../components/TimeDate";
import Sidebar from "../components/Sidebar";

// CSS
import "../css/Todo.css";

class Todo extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            item: "",
            itemId: 0,
            todos: [],
            modal: false,
            modalMode: "",
            needValidation: false,
            validationClass: "novalidation",
            backdrop: "static"
        };
        this.toggle = this.toggle.bind(this);
    }

    componentDidMount() {
        console.log("To-do component mounted.")
        this.getTodos();
    }

    // show modal
    toggle() {
        this.setState({
            modal: !this.state.modal,
            item: "",
            validationClass: "novalidation"
        });
    }

    // get to-do's from database to display onto the page
    // ------ get userID from session storage ------
    getTodos = () => {
        axios.get("/todos/users/1")
            .then(res => {
                console.log(res.data);
                this.setState({
                    todos: res.data
                })
            });
    }

    // delete task from db when task is completed
    completeToDo = (id) => {
        console.log("Attempt to complete a task");
        axios.delete("/todos/" + id)
            .then(res => {
                console.log(res)
                this.getTodos();
            });
    }

    createToDo = () => {
        this.setState({
            modalMode: "create",
        });
        this.toggle();
    }

    editToDo = (item, id) => {
        this.setState({
            modalMode: "edit",
            item: item,
            itemId: id
        });
        this.toggle();
    }

    // change item state to text input
    handleChange = (event) => {
        this.setState({
            item: event.target.value
        });
    }

    // save new task
    saveToDo = (event) => {
        event.preventDefault();
        console.log("Attempt to save new task.")
        if (this.state.item !== "") {
            this.setState({
                modal: !this.state.modal,
                needValidation: false
            });
            let toDoObj = {
                item: this.state.item,
                date: moment().format("YYYY-MM-DD HH:mm"),
                done: false,
                // *************** replace with current userId
                userId: 1
            };
            // *************** replace with current userId
            axios.post("/todos/1", toDoObj)
                .then(res => {
                    if (res.data === true) {
                        console.log("Task '" + this.state.item + "' was saved");
                        this.setState({
                            item: ""
                        });
                        this.getTodos();
                    }
                    else {
                        alert("Error: task was not saved successfully.");
                    }
                });
        }
        else {
            console.log("Invalid new task input.")
            this.setState({
                needValidation: true,
                validationClass: "validation"
            })
        }
    }

    // save edit to task
    saveEdit = (event) => {
        event.preventDefault();
        console.log("Attempt to edit existing task.")
        if (this.state.item !== "") {
            this.setState({
                modal: !this.state.modal,
                needValidation: false
            });
            axios.put("/todos/" + this.state.itemId, {item: this.state.item})
                .then(res => {
                    if (res.data === true) {
                        console.log("Task was edited to '" + this.state.item + "'");
                        this.getTodos();
                    }
                    else {
                        alert("Error: task was not edited successfully.");
                    }
                });
        }
        else {
            console.log("Invalid edit.")
            this.setState({
                needValidation: true,
                validationClass: "validation"
            })
        }
    }

    render() {

        const closeBtn = <button className="close" onClick={this.toggle}>&times;</button>;
        let modal;
        let validation;

        // modal to create a new task
        if (this.state.modal === true && this.state.modalMode === "create") {
            modal = (
                <div>
                    <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className} centered={true} backdrop={this.state.backdrop}>
                        <ModalHeader toggle={this.toggle} close={closeBtn}>New Task</ModalHeader>
                        <ModalBody>
                            <Form onSubmit={this.saveToDo}>
                                <Input type="textarea" name="text" value={this.state.item} onChange={this.handleChange} />
                                <hr />
                                <p className={this.state.validationClass}>Please fill in required field.</p>
                                <Button outline color="info" type="submit" value="Submit" className="pull-right">Add</Button>{' '}
                            </Form>
                        </ModalBody>
                    </Modal>
                </div>
            )
        }

        // modal to edit an existing task
        if (this.state.modal === true && this.state.modalMode === "edit") {
            modal = (
                <div>
                    <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className} centered={true} backdrop={this.state.backdrop}>
                        <ModalHeader toggle={this.toggle} close={closeBtn}>Edit Task</ModalHeader>
                        <ModalBody>
                            <Form onSubmit={this.saveEdit}>
                                <Input type="textarea" name="text" value={this.state.item} onChange={this.handleChange} />
                                <hr />
                                <p className={this.state.validationClass}>Please fill in required field.</p>
                                <Button outline color="info" type="submit" value="Submit" className="pull-right">Add</Button>{' '}
                            </Form>
                        </ModalBody>
                    </Modal>
                </div>
            )
        }

        return (
            <div className="container">
                <Sidebar />
                {modal}
                <p className="time_date"><TimeDate /></p>
                <Card className="text-center">
                    <CardBody>
                        <CardTitle>To-do List</CardTitle>
                        <CardText>
                            <ListGroup>
                                <ListGroupItem>
                                    <span className="task">Example</span>
                                    <span className="pull-right">
                                        <Button outline color="info" onClick={this.editToDo} name="edit">
                                            <i className="material-icons">edit</i>
                                        </Button>
                                        <Button outline color="info" onClick={() => this.completeTodo} name="complete">
                                            <i className="material-icons">done</i>
                                        </Button>
                                    </span>
                                </ListGroupItem>
                            </ListGroup>
                            <div>
                                {/************* Display Existing Tasks *************/}
                                {this.state.todos.map((item) => {
                                    return (
                                        <ListGroup>
                                            <ListGroupItem>
                                                <span className="task">{item.item}</span>
                                                <span className="pull-right">
                                                    <Button outline color="info" onClick={() => this.editToDo(item.item, item.id)} name="edit">
                                                        <i className="material-icons">edit</i>
                                                    </Button>
                                                    <Button outline color="info" onClick={() => this.completeToDo(item.id)} name="complete">
                                                        <i className="material-icons">done</i>
                                                    </Button>
                                                </span>
                                            </ListGroupItem>
                                        </ListGroup>
                                    )
                                })}
                            </div>
                        </CardText>
                        {/************* Create Task/Profile Buttons *************/}
                        <Button outline color="info" onClick={this.createToDo} name="create">New Task</Button>
                        <Button outline color="info" href="/profile">Back</Button>
                    </CardBody>
                </Card>
            </div>
        )
    }
}

export default Todo;