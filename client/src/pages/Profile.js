import React from "react";
import { Redirect } from "react-router-dom";
import {
    Card, CardBody, CardTitle, CardImg, CardSubtitle, CardText, CardDeck, Jumbotron, Container, Row, Col, Button, ListGroup, ListGroupItem
} from 'reactstrap';
import moment from "moment";
import axios from "axios";

// Components
import Quote from "../components/Quote";
import Sidebar from "../components/Sidebar";

// CSS
import "../css/Profile.css";

class Profile extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            time_date: moment().format("ddd, MMMM Do YYYY, h:mm:ss a"),
            reminders: [],
            todos: [],
            decks: [],
            notes: []
        };
        this.getReminders = this.getReminders.bind(this);
        this.getToDos = this.getToDos.bind(this);
        this.getDecks = this.getDecks.bind(this);
        this.getNotes = this.getNotes.bind(this);
    };

    componentDidMount() {
        console.log("Profile component mounted.");
        this.getReminders();
        this.getToDos();
        this.getDecks();
        this.getNotes();
    };

    // Request data from the database; obtain user id from localStorage

    getReminders = () => {
        let id = JSON.parse(localStorage.getItem("user")).id;
        axios.get("/reminders/users/" + id)
            .then(res => {
                console.log(res.data);
                this.setState({
                    reminders: res.data
                });
            });
    };

    getToDos = () => {
        let id = JSON.parse(localStorage.getItem("user")).id;
        axios.get("/todos/users/" + id)
            .then(res => {
                console.log(res.data);
                this.setState({
                    todos: res.data
                });
            });
    };

    getDecks = () => {
        let id = JSON.parse(localStorage.getItem("user")).id;
        axios.get("/decks/users/" + id)
            .then(res => {
                console.log(res.data);
                this.setState({
                    decks: res.data
                });
            });
    };

    getNotes = () => {
        let id = JSON.parse(localStorage.getItem("user")).id;
        axios.get("/notes/users/" + id)
            .then(res => {
                console.log(res.data);
                this.setState({
                    notes: res.data
                });
            });
    };

    render() {
        // if (!this.props.user) {
        //     return <Redirect to="/" />;
        // }

        let renderToDos;
        let renderReminders;
        let renderDecks;
        let renderNotes;

        // Render Reminders
        if (this.state.reminders.length > 0) {
            renderReminders = (
                <ListGroup className="scroll">
                    <div>
                        {this.state.reminders.map((reminder) => {
                            return (
                                <ListGroupItem>
                                    {reminder.item} | {reminder.date}
                                    <br />
                                    {reminder.note}
                                </ListGroupItem>
                            );
                        })}
                    </div>
                </ListGroup>
            )
        }
        else {
            renderReminders = (
                <ListGroup className="scroll">
                    <ListGroupItem className="centerText">No important dates.</ListGroupItem>
                </ListGroup>
            )
        }

        // Render To-Do List
        if (this.state.todos.length > 0) {
            renderToDos = (
                <ListGroup className="scroll">
                    <div>
                        {this.state.todos.map((todo) => {
                            return (
                                <ListGroupItem>{todo.item}</ListGroupItem>
                            );
                        })}
                    </div>
                </ListGroup>
            )
        }
        else {
            renderToDos = (
                <ListGroup className="scroll">
                    <ListGroupItem className="centerText">All tasks completed.</ListGroupItem>
                </ListGroup >
            )
        }

        // Render Decks
        if (this.state.decks.length > 1) {
            renderDecks = (
                <div>
                    <CardDeck>
                        {this.state.decks.map((deck) => {
                            return (
                                <Card>
                                    <CardImg top width="100%" src="https://www.math.utah.edu/~jasonu/flash-cards/flash-card-front.png" alt="Card image cap" />
                                    <CardBody>
                                        <CardTitle>{deck.subject}</CardTitle>
                                    </CardBody>
                                </Card>
                            );
                        })}
                    </CardDeck>
                </div>
            )
        }
        else if (this.state.decks.length === 1) {
            renderDecks = (
                <div>
                    <CardDeck>
                        {this.state.decks.map((deck) => {
                            return (
                                <Col xs="6" sm="6" md="6">
                                    <Card>
                                        <CardImg top width="100%" src="https://www.math.utah.edu/~jasonu/flash-cards/flash-card-front.png" alt="Card image cap" />
                                        <CardBody>
                                            <CardTitle>{deck.subject}</CardTitle>
                                        </CardBody>
                                    </Card>
                                </Col>
                            );
                        })}
                    </CardDeck>
                </div>
            )
        }
        else {
            renderDecks = (
                <Col>
                    <ListGroup>
                        <ListGroupItem className="noDisplay">No decks to display.</ListGroupItem>
                    </ListGroup>
                </Col>
            )
        }

        // Render Notes


        return (
            <div>
                <Sidebar handleUserLogout={this.props.handleUserLogout} />
                <Container className="text-center">
                    <Row>
                        <Col>
                            <Jumbotron className="profile animated fadeIn">
                                <Container>
                                    <h1 className="display-4">Hello, <span id="username">{JSON.parse(localStorage.getItem("user")).name}</span>!</h1>
                                    <br />
                                    <Quote />
                                    <hr className="my-2" />
                                    {this.state.time_date}
                                </Container>
                            </Jumbotron>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Card>
                                <CardBody>
                                    <CardTitle>Important Dates</CardTitle>
                                    <CardText>
                                        {/************** Display existing reminders ****************/}
                                        {renderReminders}
                                    </CardText>
                                    <Button outline color="info" id="reminder" href="/reminder">See more</Button>
                                </CardBody>
                            </Card>
                        </Col>
                        <Col>
                            <Card>
                                <CardBody>
                                    <CardTitle>To-do</CardTitle>
                                    <CardText>
                                        {/************** Display existing to-dos ****************/}
                                        {renderToDos}
                                    </CardText>
                                    <Button outline color="info" id="todo" href="/todo">See more</Button>
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                    <Row>
                        <Card className="group">
                            <h5>Recent Decks</h5>
                            {/************** Display existing decks ****************/}
                            {renderDecks}
                            <Button outline color="info" id="seeall" href="/choose">See decks</Button>
                        </Card>
                    </Row>
                    <Row>
                        <Card className="group notes">
                            <h5>Recent Notes</h5>
                            <CardDeck>
                                <Card>
                                    <CardImg top width="100%" src="http://sketchwich.com/wp-content/uploads/2018/07/29-apa-paper-template-new-apa-abstract-template-new-format-the-abstract-page-in-apa-style-6th-of-apa-paper-template-model.jpg" alt="Card image cap" />
                                    <CardBody>
                                        <CardTitle>Notes 1</CardTitle>
                                        <CardSubtitle>Card subtitle</CardSubtitle>
                                    </CardBody>
                                </Card>
                                <Card>
                                    <CardImg top width="100%" src="http://sketchwich.com/wp-content/uploads/2018/07/29-apa-paper-template-new-apa-abstract-template-new-format-the-abstract-page-in-apa-style-6th-of-apa-paper-template-model.jpg" alt="Card image cap" />
                                    <CardBody>
                                        <CardTitle>Notes 2</CardTitle>
                                        <CardSubtitle>Card subtitle</CardSubtitle>
                                    </CardBody>
                                </Card>
                                <Card>
                                    <CardImg top width="100%" src="http://sketchwich.com/wp-content/uploads/2018/07/29-apa-paper-template-new-apa-abstract-template-new-format-the-abstract-page-in-apa-style-6th-of-apa-paper-template-model.jpg" alt="Card image cap" />
                                    <CardBody>
                                        <CardTitle>Notes 3</CardTitle>
                                        <CardSubtitle>Card subtitle</CardSubtitle>
                                    </CardBody>
                                </Card>
                                <Card>
                                    <CardImg top width="100%" src="http://sketchwich.com/wp-content/uploads/2018/07/29-apa-paper-template-new-apa-abstract-template-new-format-the-abstract-page-in-apa-style-6th-of-apa-paper-template-model.jpg" alt="Card image cap" />
                                    <CardBody>
                                        <CardTitle>Notes 4</CardTitle>
                                        <CardSubtitle>Card subtitle</CardSubtitle>
                                    </CardBody>
                                </Card>
                                <Card>
                                    <CardImg top width="100%" src="http://sketchwich.com/wp-content/uploads/2018/07/29-apa-paper-template-new-apa-abstract-template-new-format-the-abstract-page-in-apa-style-6th-of-apa-paper-template-model.jpg" alt="Card image cap" />
                                    <CardBody>
                                        <CardTitle>Notes 5</CardTitle>
                                        <CardSubtitle>Card subtitle</CardSubtitle>
                                    </CardBody>
                                </Card>
                            </CardDeck>
                            {/************** Display existing decks ****************/}
                            {renderNotes}
                            <Button outline color="info" id="seeall" href="/note">See notes</Button>
                        </Card>
                    </Row>
                </Container>
            </div >
        );
    }
}

export default Profile;
