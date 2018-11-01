// Page Two of the Flashcards section (Cards Page)
// After selecting a deck, this is where you would "play" the flashcards and edit the deck
// Flashcards --> Decks --> Cards

import React from "react";
import axios from "axios";
import Flippy, { FrontSide, BackSide } from "react-flippy";
import Carousel from "nuka-carousel";
import {
  Button,
  Row,
  Col,
  Card,
  CardBody,
  CardTitle,
  CardText,
  CardSubtitle,
  Modal,
  ModalHeader,
  ModalBody,
  Form, FormGroup, Label, Input, FormText
} from "reactstrap";

// Components
import Sidebar from "../components/Sidebar";

// CSS
import "../css/PlayCards.css";

class PlayCards extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      edit: false,
      openSettings: false,
      deckName: "",
      flashcards: [],
      front: "",
      back: ""
    };

    // this.refs.cardList;
    this.toggle = this.toggle.bind(this);
    this.toggleSettings = this.toggleSettings.bind(this);
  }

  componentDidMount() {
    this.getFlashcards();
    this.getDeckInfo();
  }

  getFlashcards = () => {
    axios.get("/flashcard/1")     //**********get deckId********* */
      .then(data => {
        console.log(data.data);
        this.setState({
          flashcards: [...data.data]
        })
      })
  }

  getDeckInfo() {
    axios.get("/decks/1")       //**********get deckId********* */
      .then(data => {
        console.log(data.data)
        this.setState({
          deckName: data.data.subject
        })
      })
  }

  deleteFlashcard = (id) => {
    axios.delete("/flashcards/" + id)
      .then(data => {
        console.log(data);
        this.getFlashcards();
      })
  }

  createFlashcard = () => {
    //--------------get deckId-------------
    let obj = {
      front: this.state.front,
      back: this.state.back,
      deckId: 1
    }

    axios.post("/flashcard", obj)
      .then(data => {
        console.log(data)
        this.setState({
          front: "", 
          back: ""
        })
        this.getFlashcards()
      })
  };
    
  saveFlashcardChanges = (id, index) => {
    let obj = {
      front: this.state.flashcards[index].front,
      back: this.state.flashcards[index].back,
    }
    axios.put("/flashcard/" + id, obj)
      .then(data => {
        console.log(data);
        this.getFlashcards();
      })
  };

  handleFrontInputChange = (event) => {
    this.setState({
      front: event.target.value
    })
  }

  handleBackInputChange = (event) => {
    this.setState({
      back: event.target.value
    })
  }

  handleFrontEdit = (index, event) => {
    let flashcards = [...this.state.flashcards];
    flashcards[index].front = event.target.value
    this.setState({flashcards})
  };

  handleBackEdit = (index, event) => {
    let flashcards = [...this.state.flashcards];
    flashcards[index].back = event.target.value
    this.setState({flashcards})
  }

  toggle() {
    this.setState({
      edit: !this.state.edit
    });
  }

  toggleSettings() {
    this.setState({
      openSettings: !this.state.openSettings
    });
  }

  render() {
    //============== Card Stack==============//
    const edit = this.state.edit;
    let showCardStack;

    if (edit === true) {
      showCardStack = (
        <div className="animated slideInUp" id="flashcard-grid" isOpen="">
          <Row>
            {this.state.flashcards.map((item, index) => {
              return (
                <Col key={item.id}>
                  <Card className="flashcard animated flipInX">
                    <Button
                      color="danger"
                      type="button"
                      style={{
                        margin: "20px 10% 0 70%",
                        borderRadius: "25px"
                      }}
                      onClick={() => this.deleteFlashcard(item.id)}
                    >
                      <i className="fas fa-trash-alt"></i>
                    </Button>
                    <CardBody>
                      <CardTitle>
                        Front
                        <Input value={this.state.flashcards[index].front} onChange={(event) => this.handleFrontEdit(index, event)} />
                      </CardTitle>
                      <CardText>
                        Back
                        <Input value={this.state.flashcards[index].back} onChange={(event) => this.handleBackEdit(index, event)} />
                      </CardText>
                      <hr />
                      <CardSubtitle>#tags</CardSubtitle>
                      <hr />
                      <Button
                        onClick={() => this.saveFlashcardChanges(item.id, index)}
                        type="button"
                        style={{
                          margin: "20px 41% 0 41%",
                          borderRadius: "25px"
                        }}
                      >
                        <i className="fas fa-save"></i>
                      </Button>
                    </CardBody>
                  </Card>
                </Col>
              )
            })}
          </Row>
          <Row>
            <Col>
              <Card className="flashcard">
                <CardBody>
                  <CardTitle>
                    <label htmlFor="front">Question (front)</label>
                    <Input 
                      value={this.state.front}
                      onChange={this.handleFrontInputChange}
                      type="textarea" 
                      name="text" 
                      id="front" />
                  </CardTitle>
                  <CardText>
                    <label htmlFor="back">Answer (back)</label>
                    <Input 
                      value={this.state.back}
                      onChange={this.handleBackInputChange}
                      type="textarea" 
                      name="text" 
                      id="back" />
                  </CardText>
                  <hr />
                  <CardSubtitle>
                    <label htmlFor="tags">Tags</label>
                    <input 
                      type="text" 
                      className="form-control" 
                      id="tags" />
                  </CardSubtitle>
                  <br />
                  <Button
                    type="submit"
                    style={{
                      marginLeft: "41%",
                      marginRight: "41%",
                      borderRadius: "25px"
                    }}
                    onClick={this.createFlashcard}
                  >
                    <i className="fas fa-plus" />
                  </Button>
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

    //============== Deck Settings ==============//

    const openSettings = this.state.openSettings;
    let modal;

    if (openSettings === true) {
      modal = (
        <div>
          <Modal
            isOpen={this.state.openSettings}
            toggle={this.openSettings}
            className={this.props.className}
          >
            <ModalHeader toggle={this.openSettings}>
              <Row>
                <Col>
                  <h1 className="text-center">Settings</h1>
                </Col>
                <Col style={{ right: "-250px" }}>
                  <Button onClick={this.toggleSettings}>
                    <i className="fas fa-times" />
                  </Button>
                </Col>
              </Row>
            </ModalHeader>
            <ModalBody>
              <Row style={{ margin: "auto" }}>
                <Col>
                  <p>Make deck public</p>
                </Col>
                <Col>
                  <label className="switch">
                    <input type="checkbox" />
                    <span className="toggle-slider round" />
                  </label>
                </Col>
              </Row>
              <Row style={{ margin: "auto" }}>
                <Col>
                  <p>Send text message</p>
                </Col>
                <Col>
                  <label className="switch">
                    <input type="checkbox" />
                    <span className="toggle-slider round" />
                  </label>
                </Col>
              </Row>
              <Row style={{ margin: "auto" }}>
                <Col>
                  <p style={{ textAlign: "left" }}>Send questions every</p>
                </Col>
                <select>
                  <option value="10">10</option>
                  <option value="20">20</option>
                  <option value="30">30</option>
                  <option value="45">45</option>
                </select>
                <Col>
                  <p>minutes</p>
                </Col>
              </Row>
              <Row style={{ margin: "auto" }}>
                <Col>
                  <p style={{ textAlign: "left" }}>Send the answers every</p>
                </Col>
                <select>
                  <option value="5">5</option>
                  <option value="10">10</option>
                  <option value="15">15</option>
                  <option value="30">30</option>
                </select>
                <Col>
                  <p>minutes.</p>
                </Col>
              </Row>
            </ModalBody>
          </Modal>
        </div>
      );
    }

    return (
      <div>
        <Sidebar />

        <h1 className="text-center">{this.state.deckName}</h1>
        <hr />
        <Carousel
          // ref="cardList"
          id="carousel"
        >
        {this.state.flashcards.map(item => {
          return (
          <Flippy
            key={item.id}
            flipOnHover={false}
            flipOnClick={true}
            flipDirection="horizontal"
            ref={r => (this.Flippy = r)}
            style={{ width: "400px", height: "200px" }}
          >
            <FrontSide style={{ backgroundColor: "#93bbde" }}>
              {item.front}
            </FrontSide>

            <BackSide style={{ backgroundColor: "#66b361" }}>
              {item.back}
            </BackSide>
          </Flippy>
          )
        })}
          {/* <Flippy
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
          </Flippy> */}
        </Carousel>
        <div id="edit-btns">
          <Button color="primary" id="edit-deck-btn" onClick={this.toggle}>
            Edit
          </Button>
          <Button id="settings-btn" color="dark" onClick={this.toggleSettings}>
            <i className="fas fa-cogs" />
          </Button>
        </div>
        {showCardStack}
        {modal}
      </div>
    );
  }
}

export default PlayCards;
