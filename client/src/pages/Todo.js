import React from "react";
import {
    Card, CardBody, CardTitle, CardImg, CardSubtitle, CardText, CardGroup, Jumbotron, Container, Button, ListGroup, ListGroupItem
} from 'reactstrap';

// Components
import Time_date from "../components/Time_date";

// CSS
import "../css/Todo.css";

class Todo extends React.Component {
    state = {
        list: []
    }

    render() {
        return (
            <div className="container">
            <p className="time_date"><Time_date /></p>
                <Card className="text-center">
                    <CardBody>
                        <CardTitle>To-dos</CardTitle>
                        <CardText>
                            <ListGroup>
                                <ListGroupItem><p><span className="task">Study for exam</span><span className="duedate">10/10/10</span></p></ListGroupItem>
                                <ListGroupItem>Turn in homework</ListGroupItem>
                                <ListGroupItem>Go to office hours</ListGroupItem>
                                <ListGroupItem>Study some more</ListGroupItem>
                                <ListGroupItem>Get enough rest</ListGroupItem>
                            </ListGroup>
                        </CardText>
                        <Button outline color="info" id="todo"><i class="material-icons">note_add</i></Button> <Button outline color="info" id="todo" href="/profile"><i class="material-icons">chevron_left</i></Button>
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
