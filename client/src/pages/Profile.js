import React from "react";
import {
    Card, CardBody, CardTitle, CardImg, CardSubtitle, CardText, CardGroup, Jumbotron, Container, Button, ListGroup, ListGroupItem
} from 'reactstrap';

// Components
import Quote from "../components/Quote";

// CSS
import "../css/Profile.css";

class Profile extends React.Component {
    render() {
        return (
            <div>
                <div className="container text-center">
                    <div className="row">
                        <div className="col">
                            <Jumbotron>
                                <Container>
                                    <h1 className="display-4">Hello, [insert username here]!</h1>
                                    <br />
                                    <p className="lead">"Motivational/Pure/Wholesome Quote." - Anonymous</p>
                                    <hr className="my-2" />
                                    <p>Time | Date</p>
                                    <Quote />
                                </Container>
                            </Jumbotron>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col">
                            <Card>
                                <CardBody>
                                    <CardTitle>Important Dates</CardTitle>
                                    <CardText>
                                        <ListGroup>
                                            <ListGroupItem>Exam: 11/21/18 2:00pm</ListGroupItem>
                                            <ListGroupItem>Exam: 11/21/18 2:00pm</ListGroupItem>
                                            <ListGroupItem>Exam: 11/21/18 2:00pm</ListGroupItem>
                                            <ListGroupItem>Exam: 11/21/18 2:00pm</ListGroupItem>
                                            <ListGroupItem>Exam: 11/21/18 2:00pm</ListGroupItem>
                                        </ListGroup>
                                    </CardText>
                                    <Button>Add</Button>
                                </CardBody>
                            </Card>
                        </div>
                        <div className="col">
                            <Card>
                                <CardBody>
                                    <CardTitle>To-dos</CardTitle>
                                    <CardText>
                                        <ListGroup>
                                            <ListGroupItem>Study for exam</ListGroupItem>
                                            <ListGroupItem>Turn in homework</ListGroupItem>
                                            <ListGroupItem>Go to office hours</ListGroupItem>
                                            <ListGroupItem>Study some more</ListGroupItem>
                                            <ListGroupItem>Get enough rest</ListGroupItem>
                                        </ListGroup>
                                    </CardText>
                                    <Button>Add</Button>
                                </CardBody>
                            </Card>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col">
                            <Card className="group">
                                <h3>Recent Decks</h3>
                                <CardGroup>
                                    <Card>
                                        <CardImg top width="100%" src="https://www.math.utah.edu/~jasonu/flash-cards/flash-card-front.png" alt="Card image cap" />
                                        <CardBody>
                                            <CardTitle>Deck 1</CardTitle>
                                            <CardSubtitle>Card subtitle</CardSubtitle>
                                        </CardBody>
                                    </Card>
                                    <Card>
                                        <CardImg top width="100%" src="https://www.math.utah.edu/~jasonu/flash-cards/flash-card-front.png" alt="Card image cap" />
                                        <CardBody>
                                            <CardTitle>Deck 2</CardTitle>
                                            <CardSubtitle>Card subtitle</CardSubtitle>
                                        </CardBody>
                                    </Card>
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
                                </CardGroup>
                            </Card>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col">
                            <Card className="group">
                                <h3>Recent Notes</h3>
                                <CardGroup>
                                    <Card>
                                        <CardImg top width="100%" src="http://sketchwich.com/wp-content/uploads/2018/07/29-apa-paper-template-new-apa-abstract-template-new-format-the-abstract-page-in-apa-style-6th-of-apa-paper-template-model.jpg" alt="Card image cap" />
                                        <CardBody>
                                            <CardTitle>Notes 1</CardTitle>
                                            <CardSubtitle>Card subtitle</CardSubtitle>
                                            <Button>Button</Button>
                                        </CardBody>
                                    </Card>
                                    <Card>
                                        <CardImg top width="100%" src="http://sketchwich.com/wp-content/uploads/2018/07/29-apa-paper-template-new-apa-abstract-template-new-format-the-abstract-page-in-apa-style-6th-of-apa-paper-template-model.jpg" alt="Card image cap" />
                                        <CardBody>
                                            <CardTitle>Notes 2</CardTitle>
                                            <CardSubtitle>Card subtitle</CardSubtitle>
                                            <Button>Button</Button>
                                        </CardBody>
                                    </Card>
                                    <Card>
                                        <CardImg top width="100%" src="http://sketchwich.com/wp-content/uploads/2018/07/29-apa-paper-template-new-apa-abstract-template-new-format-the-abstract-page-in-apa-style-6th-of-apa-paper-template-model.jpg" alt="Card image cap" />
                                        <CardBody>
                                            <CardTitle>Notes 3</CardTitle>
                                            <CardSubtitle>Card subtitle</CardSubtitle>
                                            <Button>Button</Button>
                                        </CardBody>
                                    </Card>
                                    <Card>
                                        <CardImg top width="100%" src="http://sketchwich.com/wp-content/uploads/2018/07/29-apa-paper-template-new-apa-abstract-template-new-format-the-abstract-page-in-apa-style-6th-of-apa-paper-template-model.jpg" alt="Card image cap" />
                                        <CardBody>
                                            <CardTitle>Notes 4</CardTitle>
                                            <CardSubtitle>Card subtitle</CardSubtitle>
                                            <Button>Button</Button>
                                        </CardBody>
                                    </Card>
                                    <Card>
                                        <CardImg top width="100%" src="http://sketchwich.com/wp-content/uploads/2018/07/29-apa-paper-template-new-apa-abstract-template-new-format-the-abstract-page-in-apa-style-6th-of-apa-paper-template-model.jpg" alt="Card image cap" />
                                        <CardBody>
                                            <CardTitle>Notes 5</CardTitle>
                                            <CardSubtitle>Card subtitle</CardSubtitle>
                                            <Button>Button</Button>
                                        </CardBody>
                                    </Card>
                                </CardGroup>
                            </Card>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Profile;
