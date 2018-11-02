import React from "react";
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

    constructor(props) {
        super(props);
        this.state = {
            name: "Jiraiya", // delete this later
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
        this.getReminders();
        this.getToDos();
        this.getDecks();
        this.getNotes();
    };

    // request data from the database; save response as states

    getReminders = () => {
        let id = this.props.user.id;
        axios.get("/reminders/users/" + id)
            .then(res => {
                console.log(res.data);
                this.setState({
                    reminders: res.data
                });
            });
    };

    getToDos = () => {
        let id = this.props.user.id;
        axios.get("/todos/users/" + id)
            .then(res => {
                console.log(res.data);
                this.setState({
                    todos: res.data
                });
            });
    };

    getDecks = () => {
        let id = this.props.user.id;
        axios.get("/decks/users/" + id)
            .then(res => {
                console.log(res.data);
                this.setState({
                    decks: res.data
                });
            });
    };

    getNotes = () => {
        let id = this.props.user.id;
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
                <Sidebar />
                <Container className="text-center">
                    <Row>
                        <Col>
                            <Jumbotron className="profile animated fadeIn">
                                <Container>
                                    {/* add username using this.props */}
                                    <h1 className="display-4">Hello, <span id="username">{this.state.name}</span>!</h1>
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
                                            <ListGroupItem>Exam 11/21/18 2:00pm</ListGroupItem>
                                            <ListGroupItem>Quiz 11/21/18 2:00pm</ListGroupItem>
                                            <ListGroupItem>Homework 2 11/21/18 2:00pm</ListGroupItem>                                            <ListGroupItem>Midterm 11/21/18 2:00pm</ListGroupItem>
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
                                            <ListGroupItem>Study for exam</ListGroupItem>
                                            <ListGroupItem>Turn in homework</ListGroupItem>
                                            <ListGroupItem>Go to office hours</ListGroupItem>
                                            <ListGroupItem>Study some more</ListGroupItem>
                                            <ListGroupItem>Get enough rest</ListGroupItem>
                                            <ListGroupItem>Get enough rest</ListGroupItem>
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
                                                    <CardSubtitle>Card subtitle</CardSubtitle>
                                                </CardBody>
                                            </Card>
                                        </Col>
                                        <Col>
                                            <Card>
                                                <CardImg top width="100%" src="https://www.math.utah.edu/~jasonu/flash-cards/flash-card-front.png" alt="Card image cap" />
                                                <CardBody>
                                                    <CardTitle>Deck 2</CardTitle>
                                                    <CardSubtitle>Card subtitle</CardSubtitle>
                                                </CardBody>
                                            </Card>
                                        </Col>
                                        <Card>
                                            <CardImg top width="100%" src="https://www.math.utah.edu/~jasonu/flash-cards/flash-card-front.png" alt="Card image cap" />
                                            <CardBody>
                                                <CardTitle>Deck 3</CardTitle>
                                                <CardSubtitle>Card subtitle</CardSubtitle>
                                            </CardBody>
                                        </Card>
                                        <Card>
                                            <CardImg top width="100%" src="https://www.math.utah.edu/~jasonu/flash-cards/flash-card-front.png" alt="Card image cap" />
                                            <CardBody>
                                                <CardTitle>Deck 4</CardTitle>
                                                <CardSubtitle>Card subtitle</CardSubtitle>
                                            </CardBody>
                                        </Card>
                                        <Card>
                                            <CardImg top width="100%" src="https://www.math.utah.edu/~jasonu/flash-cards/flash-card-front.png" alt="Card image cap" />
                                            <CardBody>
                                                <CardTitle>Deck 5</CardTitle>
                                                <CardSubtitle>Card subtitle</CardSubtitle>
                                            </CardBody>
                                        </Card>
                                        <Card>
                                            <CardImg top width="100%" src="https://www.math.utah.edu/~jasonu/flash-cards/flash-card-front.png" alt="Card image cap" />
                                            <CardBody>
                                                <CardTitle>Deck 6</CardTitle>
                                                <CardSubtitle>Card subtitle</CardSubtitle>
                                            </CardBody>
                                        </Card>
                                    </CardGroup>
                                    <Button outline color="info" id="seeall" href="/reminder">See all decks</Button>
                                </Row>
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
