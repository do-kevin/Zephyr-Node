import React from "react";
import {Redirect} from "react-router-dom";
import {
    Card, CardBody, CardTitle, CardImg, CardSubtitle, CardText, CardGroup, Jumbotron, Container, Row, Col, Button, ListGroup, ListGroupItem
} from 'reactstrap';
import moment from "moment";
import axios from "axios";

// Components
import Quote from "../components/Quote";
import Sidebar from "../components/Sidebar";

// CSS
import "../css/Profile.css";

class Profile extends React.Component {

    // user information
    // this.props.user.name
    // this.props.user.id
    // this.props.user.username(?)

    constructor(props) {
        super(props);
        this.state = {
            // name: "Jiraiya",
            id: null,
            time_date: moment().format("ddd, MMMM Do YYYY, h:mm:ss a"),
            reminders: [], // arrays of objects
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
        try {
            const userId = JSON.parse(localStorage.getItem("user")).id;
            if (userId) this.setState(() => ({id: userId}));
        } catch (err) {
            console.log(err.message);
        }
        this.getReminders();
        this.getToDos();
        this.getDecks();
        this.getNotes();
    };

    // request data from the database; save response into this.state

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
        return (
            <div>
                {/* Logout redirection */}
                {this.props.handleUserRedirect()}

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
                                        <ListGroup className="scroll">
                                            <ListGroupItem>Exam 11/21/18 2:00pm (dummy)</ListGroupItem>
                                            <div>
                                                {/************** Display existing reminders START ****************/}
                                                {this.state.reminders.map((reminder) => {
                                                    return (
                                                        <ListGroupItem>{reminder.item}</ListGroupItem>
                                                    );
                                                })}
                                                {/************** Display existing reminders END ****************/}
                                            </div>
                                        </ListGroup>
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
                                        <ListGroup className="scroll">
                                            <ListGroupItem>Do homework (dummy)</ListGroupItem>
                                            <div>
                                                {/************** Display existing to-dos START ****************/}
                                                {this.state.todos.map((todo) => {
                                                    return (
                                                        <ListGroupItem>{todo.item}</ListGroupItem>
                                                    );
                                                })}
                                                {/************** Display existing to-dos END ****************/}
                                            </div>
                                        </ListGroup>
                                    </CardText>
                                    <Button outline color="info" id="todo" href="/todo">See more</Button>
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Card className="group">
                                <h3>Recent Decks</h3>
                                <Row>
                                    <CardGroup>
                                        <Col>
                                            <Card>
                                                <CardImg top width="100%" src="https://www.math.utah.edu/~jasonu/flash-cards/flash-card-front.png" alt="Card image cap" />
                                                <CardBody>
                                                    <CardTitle>Deck 1</CardTitle>
                                                    <CardSubtitle>Dummy</CardSubtitle>
                                                </CardBody>
                                            </Card>
                                        </Col>
                                        <div>
                                            {/************** Display existing decks START ****************/}
                                            {this.state.decks.map((deck) => {
                                                return (
                                                    <Col>
                                                        <Card>
                                                            <CardImg top width="100%" src="https://www.math.utah.edu/~jasonu/flash-cards/flash-card-front.png" alt="Card image cap" />
                                                            <CardBody>
                                                                <CardTitle>{deck.subject}</CardTitle>
                                                                <CardSubtitle>Private: {deck.private}</CardSubtitle>
                                                                <CardSubtitle>Daily Quiz: {deck.dailyQuiz}</CardSubtitle>
                                                            </CardBody>
                                                        </Card>
                                                    </Col>
                                                );
                                            })}
                                            {/************** Display existing decks END ****************/}
                                        </div>
                                    </CardGroup>
                                </Row>
                                <Button outline color="info" id="seeall" href="/reminder">See all decks</Button>
                            </Card>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Card className="group notes">
                                <h3>Recent Notes</h3>
                                <CardGroup>
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
                                </CardGroup>
                                <Button outline color="info" id="seeall" href="/note">See all notes</Button>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </div>
        );
    }
}

export default Profile;
