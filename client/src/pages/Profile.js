import React from "react";
import {
    Card, CardBody, CardTitle, CardImg, CardSubtitle, CardText, CardGroup, Jumbotron, Container, Row, Col, Button, ListGroup, ListGroupItem
} from 'reactstrap';

// Components
import Quote from "../components/Quote";
import TimeDate from "../components/TimeDate";
import Sidebar from "../components/Sidebar";

// CSS
import "../css/Profile.css";

class Profile extends React.Component {
    render() {
        return (
            <div>
                <Sidebar />
                <Container className="text-center">
                    <Row>
                        <Col>
                            <Jumbotron className="animated fadeIn">
                                <Container>
                                    <h1 className="display-4">Hello, <span id="username">[insert username here]</span>!</h1>
                                    <br />
                                    <Quote />
                                    <hr className="my-2" />
                                    <p><TimeDate /></p>
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
                                    <Button outline color="info" id="reminder">Add</Button>
                                </CardBody>
                            </Card>
                        </Col>
                        <Col>
                            <Card>
                                <CardBody>
                                    <CardTitle>To-dos</CardTitle>
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
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </div>
        );
    }
}

export default Profile;
