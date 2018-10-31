// Page Two of the Flashcards section (Cards Page)
// After selecting a deck, this is where you would "play" the flashcards and edit the deck
// Flashcards --> Decks --> Cards

import React from "react";
import Flippy, { FrontSide, BackSide } from "react-flippy";
import Carousel from "nuka-carousel";
import {
  Button,
  Row,
  Col,
  Card,
  CardBody,
  CardTitle,
  CardText
} from "reactstrap";

// Components
import Sidebar from "../components/Sidebar";

// CSS
import "../css/PlayCards.css";

class PlayCards extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      edit: false
    };

    // this.refs.cardList;
    this.toggle = this.toggle.bind(this);
  }

  componentDidMount() {}

  toggle() {
    this.setState({
      edit: !this.state.edit
    });
  }

  render() {
    const edit = this.state.edit;
    let showCardStack;

    if (edit === true) {
      showCardStack = (
        <div className="animated slideInUp" id="flashcard-grid" isOpen="">
          <Row>
            <Col>
              <Card className="flashcard">
                <CardBody>
                  <CardTitle>Question 1</CardTitle>
                  <CardText>Answer</CardText>
                </CardBody>
              </Card>
            </Col>
            <Col>
              <Card className="flashcard">
                <CardBody>
                  <CardTitle>Question 2</CardTitle>
                  <CardText>Answer</CardText>
                </CardBody>
              </Card>
            </Col>
            <Col>
              <Card className="flashcard">
                <CardBody>
                  <CardTitle>Question 3</CardTitle>
                  <CardText>Answer</CardText>
                </CardBody>
              </Card>
            </Col>
          </Row>
          <Row>
            <Col>
              <Card className="flashcard">
                <CardBody>
                  <CardTitle>Question 5</CardTitle>
                  <CardText>Answer</CardText>
                </CardBody>
              </Card>
            </Col>
            <Col>
              <Card className="flashcard">
                <CardBody>
                  <CardTitle>Question 6</CardTitle>
                  <CardText>Answer</CardText>
                </CardBody>
              </Card>
            </Col>
            <Col>
              <Card className="flashcard">
                <CardBody>
                  <CardTitle>Question 7</CardTitle>
                  <CardText>Answer</CardText>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </div>
      );
    } else if (edit === false) {
      showCardStack = (
        <div className="animated fadeOut" id="flashcard-grid" isOpen="" />
      );
    }

    return (
      <div>
        <Sidebar />

        <h1 className="text-center">Deck Name</h1>
        <hr />
        <Carousel
          // ref="cardList"
          id="carousel"
        >
          <Flippy
            flipOnHover={false}
            flipOnClick={true}
            flipDirection="horizontal"
            ref={r => (this.Flippy = r)}
            style={{ width: "400px", height: "200px" }}
          >
            <FrontSide style={{ backgroundColor: "#93bbde" }}>
              Front: Question
            </FrontSide>

            <BackSide style={{ backgroundColor: "#66b361" }}>
              Back: Answer
            </BackSide>
          </Flippy>
          <Flippy
            flipOnHover={false}
            flipOnClick={true}
            flipDirection="horizontal"
            ref={r => (this.Flippy = r)}
            style={{ width: "400px", height: "200px" }}
          >
            <FrontSide style={{ backgroundColor: "#93bbde" }}>
              Front: Question
            </FrontSide>

            <BackSide style={{ backgroundColor: "#66b361" }}>
              Back: Answer
            </BackSide>
          </Flippy>
          <Flippy
            flipOnHover={false}
            flipOnClick={true}
            flipDirection="horizontal"
            ref={r => (this.Flippy = r)}
            style={{ width: "400px", height: "200px" }}
          >
            <FrontSide style={{ backgroundColor: "#93bbde" }}>
              <div>Front: Question</div>
            </FrontSide>

            <BackSide style={{ backgroundColor: "#66b361" }}>
              <div>
                Back: Answer Back: Answer Back: Answer Back: Answer Back: Answer
                Back: Answer Back: Answer Back: Answer Back: Answer Back: Answer
                Back: Answer Back: Answer Back: Answer Back: Answer Back: Answer
                Back: Answer Back: Answer Back: Answer Back: Answer Back: Answer
                Back: Answer Back: Answer Back: Answer Back: Answer Back: Answer
                Back: Answer Back: Answer Back: Answer Back: Answer Back: Answer
                Back: Answer Back: Answer Back: Answer Back: Answer Back: Answer
                Back: Answer Back: Answer Back: Answer Back: Answer Back: Answer
                Back: Answer Back: Answer Back: Answer Back: Answer Back: Answer
                Back: Answer Back: Answer Back: Answer Back: Answer Back: Answer
                Back: Answer Back: Answer Back: Answer Back: Answer Back: Answer
                Back: Answer Back: Answer Back: Answer Back: Answer Back: Answer
                Back: Answer Back: Answer Back: Answer Back: Answer Back: Answer
                Back: Answer Back: Answer Back: Answer Back: Answer
              </div>
            </BackSide>
          </Flippy>
        </Carousel>
        <div id="edit-btns">
          <Button color="primary" id="edit-deck-btn" onClick={this.toggle}>
            Edit
          </Button>
          <Button id="settings-btn" color="dark">
            <i class="fas fa-cogs" />
          </Button>
        </div>
        {showCardStack}
      </div>
    );
  }
}

export default PlayCards;
