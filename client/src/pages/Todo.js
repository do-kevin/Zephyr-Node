import React from "react";
import {
    Card, CardBody, CardTitle, CardText, Button, ListGroup, ListGroupItem, Modal, ModalHeader, ModalBody, Form, Input
} from 'reactstrap';
import axios from "axios";

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
            todos: [],
            modal: false,
            modalMode: "",
            backdrop: "static"
        };
        this.toggle = this.toggle.bind(this);
    }

    componentDidMount() {
        console.log("To-do component mounted.")
        this.getTodos();
    }

    toggle(event) {
        this.setState({
            modal: !this.state.modal,
            modalMode: event.target.name
        });
    }

    // get to-do's from database to display onto the page
    getTodos = () => {
        axios.get("/todos/users/1")
            .then(res => {
                this.setState({
                    todos: res.data
                })
            });
    }

    // delete task from db when task is completed
    completeTodo = (id) => {
        axios.delete("/todos/" + id)
            .then(res => {
                console.log(res)
                this.getTodos();
            });
    }

    // 
    createToDo = (event) => {
        this.toggle(event);
    }

    editToDo = () => {
        this.toggle();
    }

    // change item state to edit existing task or add a new task
    handleChange = (event) => {
        this.setState({
            item: event.target.value
        });
    }

    // submitToDo = (event) => {
    //     event.preventDefault();
    //     this.setState({
    //         modal: !this.state.modal,
    //         modalMode: event.target.name
    //     });
    //     console.log('Task submitted!');
    //     axios.post("/todos/:userId")
    //         .then(res => {
    //             this.setState({
    //                 item: res.data.item
    //             })
    //         });
    // }

    render() {

        const closeBtn = <button className="close" onClick={this.toggle}>&times;</button>;
        let modal;

        // depending on whether a task is being created or editted, different modals will appear
        if (this.state.modal === true && this.state.modalMode === "create") {
            modal = (
                <div>
                    <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className} centered={true} backdrop={this.state.backdrop}>
                        <ModalHeader toggle={this.toggle} close={closeBtn}>New Task</ModalHeader>
                        <ModalBody>
                            <Form onSubmit={this.submitToDo}>
                                <Input type="textarea" name="text" value={this.state.item} onChange={this.handleChange} />
                                <hr />
                                <Button outline color="info" type="submit" value="Submit" className="pull-right" onClick={this.submitToDo}>Add</Button>{' '}
                            </Form>
                        </ModalBody>
                    </Modal>
                </div>
            )
        }

        if (this.state.modal === true && this.state.modalMode === "edit") {
            modal = (
                <div>
                    <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className} centered={true} backdrop={this.state.backdrop}>
                        <ModalHeader toggle={this.toggle} close={closeBtn}>Edit Task</ModalHeader>
                        <ModalBody>
                            <Form>
                                <Input type="textarea" name="text" value={this.state.item} onChange={this.handleChange} />
                                <hr />
                                <Button outline color="info" type="submit" value="Submit" className="pull-right" onClick={this.submitToDo}>Add</Button>{' '}
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
                                        <Button outline color="info" onClick={this.toggle} name="edit">
                                            <i className="material-icons">edit</i>
                                        </Button>
                                        <Button outline color="info" onClick={() => this.toggle} name="complete">
                                            <i className="material-icons">done</i>
                                        </Button>
                                    </span>
                                </ListGroupItem>
                            </ListGroup>
                            <div>
                                {/************* Display Existing Tasks *************/}
                                {this.state.todos.map((item, index) => {
                                    return (
                                        <ListGroup>
                                            <ListGroupItem>
                                                <span className="task">{item.item}</span>
                                                <span className="pull-right">
                                                    <Button outline color="info" onClick={() => this.toggle} name="edit">
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