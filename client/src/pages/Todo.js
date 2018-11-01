import React from "react";
import {
    Card, CardBody, CardTitle, CardText, Button, ListGroup, ListGroupItem, Modal, ModalHeader, ModalBody, ModalFooter, Form, Input, Label
} from 'reactstrap';

// Components
import TimeDate from "../components/TimeDate";
import Sidebar from "../components/Sidebar";

// CSS
import "../css/Todo.css";

class Todo extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            modal: false,
            backdrop: "static",
            newtask: ""
        };
        this.toggle = this.toggle.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    toggle() {
        this.setState({
            modal: !this.state.modal,
            newtask: ""
        });
    }

    handleChange(event) {
        this.setState({
            newtask: event.target.value
        });
    }

    handleSubmit(event) {
        alert('Task submitted!');
        event.preventDefault();
    }

    render() {

        const closeBtn = <button className="close" onClick={this.toggle}>&times;</button>;
        let modal;

        if (this.state.modal === true) {
            modal = (
                <div>
                    <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className} centered={true} backdrop={this.state.backdrop}>
                        <ModalHeader toggle={this.toggle} close={closeBtn}>New Task</ModalHeader>
                        <ModalBody>
                            <Form onSubmit={this.handleSubmit}>
                                <Input type="textarea" name="text" value={this.state.newtask} onChange={this.handleChange} />
                            </Form>
                        </ModalBody>
                        <ModalFooter>
                            <Button color="primary" type="submit" value="Submit" onClick={this.toggle}>Add</Button>{' '}
                            <Button color="secondary" onClick={this.toggle}>Cancel</Button>
                        </ModalFooter>
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
                                <ListGroupItem className="task">Study for exam</ListGroupItem>
                                <ListGroupItem>Turn in homework</ListGroupItem>
                                <ListGroupItem>Go to office hours</ListGroupItem>
                                <ListGroupItem>Study some more</ListGroupItem>
                                <ListGroupItem>Get enough rest</ListGroupItem>
                            </ListGroup>
                        </CardText>
                        <Button outline color="info" onClick={this.toggle} name='create'><i class="material-icons">note_add</i></Button><Button outline color="info" id="todo" href="/profile"><i class="material-icons">chevron_left</i></Button>
                    </CardBody>
                </Card>
                {/* <Card>
                    <CardBody>
                        <CardTitle>Completed</CardTitle>
                        <CardText>
                            <ListGroup>
                                <ListGroupItem>Complete</ListGroupItem>
                                <ListGroupItem>Complete</ListGroupItem>
                                <ListGroupItem>Complete</ListGroupItem>
                            </ListGroup>
                        </CardText>
                    </CardBody>
                </Card> */}
            </div>
        )
    }
}

export default Todo;
