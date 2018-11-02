// Page Two of the Flashcards section (Cards Page)
// After selecting a deck, this is where you would "play" the flashcards and edit the deck
// Flashcards --> Decks --> Cards

import React from "react";
import axios from "axios";
import moment from "moment";
import Flippy, { FrontSide, BackSide } from "react-flippy";
import Carousel from "nuka-carousel";
import {
  Button,
  ButtonGroup,
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
  Form,
  FormGroup,
  Label,
  Input,
  FormText,
  Container
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
      back: "",
      privacy: false,
      sendAlert: false,
      alertTime: "",
      timeInterval: 1
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
    axios
      .get("/flashcard/1") //**********get deckId********* */
      .then(data => {
        console.log(data.data);
        this.setState({
          flashcards: [...data.data]
        });
      });
  };

  getDeckInfo() {
    axios
      .get("/decks/1") //**********get deckId********* */
      .then(data => {
        console.log(data.data);
        this.setState({
          deckName: data.data.subject
        });
      });
  }

  deleteFlashcard = id => {
    axios.delete("/flashcards/" + id).then(data => {
      console.log(data);
      this.getFlashcards();
    });
  };

  createFlashcard = () => {
    //--------------get deckId-------------
    let obj = {
      front: this.state.front,
      back: this.state.back,
      deckId: 1
    };

    axios.post("/flashcard", obj).then(data => {
      console.log(data);
      this.setState({
        front: "",
        back: ""
      });
      this.getFlashcards();
    });
  };

  saveFlashcardChanges = (id, index) => {
    let obj = {
      front: this.state.flashcards[index].front,
      back: this.state.flashcards[index].back
    };
    axios.put("/flashcard/" + id, obj).then(data => {
      console.log(data);
      this.getFlashcards();
    });
  };

  //deck settings
  saveSettings = () => {
    let obj = {
      private: this.state.privacy,
      dailyQuiz: this.state.sendAlert,
      time: this.state.alertTime,
      alertInterval: this.state.timeInterval
    };
    //-----------------deck id----------------
    axios.put("/decks/1", obj).then(data => {
      // console.log(data);
      this.toggleSettings();

      //create appointment if user chooses to get daily questions
      if (this.state.sendAlert) {
        this.createAppointments();
      }
    });
  };

  getDeckSettings = () => {
    this.toggleSettings();
    //-----------------deckId----------------
    axios.get("/decks/1").then(data => {
      this.setState({
        privacy: data.data.private,
        sendAlert: data.data.dailyQuiz,
        alertTime: data.data.time,
        timeInterval: data.data.alertInterval
      });
    });
  };

  createAppointments = () => {
    //-----------------------userid---------------------
    //----------------------deckId------------------------
    this.state.flashcards.map((item, index) => {
      let eventDate = moment(this.state.alertTime, "HH:mm")
        .add(index, "days")
        .format("YYYY-MM-DD HH:mm");
      let obj = {
        date: eventDate,
        notification: 0,
        message: item.front,
        userId: 1,
        type: "deck",
        deckId: 1
      };
      axios.post("/appointment", obj).then(data => {
        console.log(data);
        obj.date = moment(this.state.alertTime, "HH:mm")
          .add(index, "days")
          .add(this.state.timeInterval, "minutes")
          .format("YYYY-MM-DD HH:mm");
        obj.message = item.back;
        axios.post("/appointment", obj).then(data => {
          console.log(data);
        });
      });
    });
  };

  handleFrontInputChange = event => {
    this.setState({
      front: event.target.value
    });
  };

  handleBackInputChange = event => {
    this.setState({
      back: event.target.value
    });
  };

  handleFrontEdit = (index, event) => {
    let flashcards = [...this.state.flashcards];
    flashcards[index].front = event.target.value;
    this.setState({ flashcards });
  };

  handleBackEdit = (index, event) => {
    let flashcards = [...this.state.flashcards];
    flashcards[index].back = event.target.value;
    this.setState({ flashcards });
  };

  handlePrivacyChange = () => {
    // console.log(!this.state.privacy);
    this.setState({
      privacy: !this.state.privacy
    });
  };

  handleAlertChange = () => {
    // console.log(!this.state.sendAlert);
    this.setState({
      sendAlert: !this.state.sendAlert
    });
  };

  handleAlertTimeChange = event => {
    // console.log(moment(event.target.value, "HH:mm").format("YYYY-MM-DD HH:mm"))
    this.setState({
      alertTime: event.target.value
    });
  };

  handleSelectChange = event => {
    this.setState({
      timeInterval: event.target.value
    });
  };

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
        // isOpen=""
        <div className="animated slideInUp" id="flashcard-grid">
          <Row>
            {this.state.flashcards.map((item, index) => {
              return (
                <Col key={item.id}>
                  <Card className="flashcard animated flip">
                    <Button
                      color="danger"
                      type="button"
                      style={{
                        margin: "20px 10% 0 70%",
                        borderRadius: "25px"
                      }}
                      onClick={() => this.deleteFlashcard(item.id)}
                    >
                      <i className="fas fa-trash-alt" />
                    </Button>
                    <CardBody>
                      <CardTitle>
                        Front
                        <Input
                          value={this.state.flashcards[index].front}
                          onChange={event => this.handleFrontEdit(index, event)}
                        />
                      </CardTitle>
                      <CardText>
                        Back
                        <Input
                          value={this.state.flashcards[index].back}
                          onChange={event => this.handleBackEdit(index, event)}
                        />
                      </CardText>
                      <Button
                        onClick={() =>
                          this.saveFlashcardChanges(item.id, index)
                        }
                        type="button"
                        style={{
                          margin: "20px 41% 0 41%",
                          borderRadius: "25px"
                        }}
                      >
                        <i className="fas fa-save" />
                      </Button>
                    </CardBody>
                  </Card>
                </Col>
              );
            })}
          </Row>
          <Row>
            <Col>
              <Card className="flashcard animated bounceInUp">
                <CardBody>
                  <CardTitle>
                    <label htmlFor="front">Question (front)</label>
                    <Input
                      value={this.state.front}
                      onChange={this.handleFrontInputChange}
                      type="textarea"
                      name="text"
                      id="front"
                    />
                  </CardTitle>
                  <CardText>
                    <label htmlFor="back">Answer (back)</label>
                    <Input
                      value={this.state.back}
                      onChange={this.handleBackInputChange}
                      type="textarea"
                      name="text"
                      id="back"
                    />
                  </CardText>
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
        // isOpen=""
        <div className="animated fadeOut" id="flashcard-grid" />
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
                  <Label className="switch">
                    <Input
                      type="checkbox"
                      onChange={this.handlePrivacyChange}
                      checked={this.state.privacy ? "checked" : ""}
                    />
                    <span className="toggle-slider round" />
                  </Label>
                </Col>
              </Row>
              <Row style={{ margin: "auto" }}>
                <Col>
                  <p>Send text message</p>
                </Col>
                <Col>
                  <label className="switch">
                    <input
                      type="checkbox"
                      onChange={this.handleAlertChange}
                      checked={this.state.sendAlert ? "checked" : ""}
                    />
                    <span className="toggle-slider round" />
                  </label>
                </Col>
              </Row>
              <Row style={{ margin: "auto" }}>
                <Col>
                  <p style={{ textAlign: "left" }}>Send Daily Questions at </p>
                </Col>
                <Col>
                  <div className="control">
                    <input
                      type="time"
                      id="appt-time"
                      name="appt-time"
                      onChange={this.handleAlertTimeChange}
                      value={this.state.alertTime}
                      required={this.state.sendAlert ? "required" : ""}
                    />
                  </div>
                </Col>
              </Row>
              <Row style={{ margin: "auto" }}>
                <Col>
                  <p style={{ textAlign: "left" }}>Send the answers every</p>
                </Col>
                <select
                  defaultValue={this.state.timeInterval}
                  onChange={this.handleSelectChange}
                >
                  <option value="1">1</option>
                  <option value="5">5</option>
                  <option value="10">10</option>
                  <option value="15">15</option>
                  <option value="30">30</option>
                </select>
                <Col>
                  <p>minutes.</p>
                </Col>
              </Row>
              <hr />
              <Row>
                <Button color="primary" onClick={this.saveSettings}>
                  Save Changes
                </Button>{" "}
                <Button color="secondary" onClick={this.toggleSettings}>
                  Cancel
                </Button>
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
                  <p>{item.front}</p>
                </FrontSide>

                <BackSide style={{ backgroundColor: "#66b361" }}>
                  <p>{item.back}</p>
                </BackSide>
              </Flippy>
            );
          })}
        </Carousel>
        <div>
          <ButtonGroup id="edit-btns">
            <Button color="primary" id="edit-deck-btn" onClick={this.toggle}>
              Edit
            </Button>
            <Button
              id="settings-btn"
              color="dark"
              onClick={this.getDeckSettings}
            >
              <i className="fas fa-cogs" />
            </Button>
          </ButtonGroup>
        </div>
        {showCardStack}
        {modal}
      </div>
    );
  }
}

export default PlayCards;
