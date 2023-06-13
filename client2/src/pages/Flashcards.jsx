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
  Modal,
  ModalHeader,
  ModalBody,
  Input,
} from "reactstrap";
import DOMPurify from "dompurify";
import styled from "styled-components";

import Sidebar from "../components/Sidebar.jsx";

import "../css/Flashcards.scss";

const Menu = styled.menu`
  #sidebar {
    top: 0;
  }
  .sidebar-nav__link--decks {
    background: hsla(214, 100%, 96%, 1);
    box-shadow: 0px 2px 1px #888, 0px -2px 1px #888;
    border-left: 5px solid hsla(220, 15%, 23%, 1);
  }
  .sidebar-nav__link--decks .sidebar-nav__text {
    color: black;
  }
`;

const inputMaxLength = "228";

class PlayCards extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      edit: false,
      openSettings: false,
      deckName: "",
      deck: {},
      flashcards: [],
      front: "",
      back: "",
      privacy: false,
      sendAlert: false,
      alertTime: "",
      timeInterval: 1,
      phoneNumberSaved: false,
      phone: "",
      appts: [],
      editSaved: false,
      editId: -1,
      userId: JSON.parse(localStorage.getItem("user")).id,
      deckId: JSON.parse(sessionStorage.getItem("deckId")),
    };
  }

  componentDidMount() {
    this.getFlashcards();
    this.getDeckInfo();
    this.getUserInfo();
    this.getDeckAppts();
    // console.log(this.props.user);
  }

  getFlashcards = () => {
    axios.get("/api/flashcard/" + this.state.deckId).then((data) => {
      console.log(data.data);
      this.setState({
        flashcards: [...data.data],
      });
    });
  };

  getDeckInfo = () => {
    axios.get("/api/decks/" + this.state.deckId).then((data) => {
      // console.log(data.data)
      this.setState({
        deckName: data.data.subject,
        privacy: data.data.private,
        sendAlert: data.data.dailyQuiz,
        alertTime: data.data.time,
        timeInterval: data.data.alertInterval,
        deck: { ...data.data },
      });
    });
  };

  getUserInfo = () => {
    axios.get("/api/user/" + this.state.userId).then((data) => {
      console.log(data.data);
      if (data.data[0].phoneNumber !== null) {
        this.setState({
          phoneNumberSaved: true,
        });
      }
    });
  };

  getDeckAppts = () => {
    axios
      .get(`/api/appointments/decks/${this.state.deckId}/${this.state.userId}`)
      .then((data) => {
        console.log(data.data);
        this.setState({
          appts: [...data.data],
        });
      });
  };

  deleteFlashcard = (id) => {
    axios.delete("/api/flashcards/" + id).then((data) => {
      console.log(data);
      this.getFlashcards();
      axios.delete("/api/appointments/decks/" + id).then((response) => {
        console.log(response);
      });
    });
  };

  createFlashcard = () => {
    let obj = {
      front: this.state.front,
      back: this.state.back,
      deckId: this.state.deckId,
    };

    axios.post("/api/flashcard", obj).then((data) => {
      console.log(data);

      if (this.state.sendAlert) {
        let obj1 = {
          date: moment(this.state.appts[this.state.appts.length - 2].date)
            .add(1, "days")
            .format("YYYY-MM-DD HH:mm"),
          notification: 0,
          message: "Daily question: " + obj.front,
          userId: this.state.userId,
          type: "deck",
          deckId: this.state.deckId,
          flashcardId: data.data.id,
          front: true,
        };
        let obj2 = {
          date: moment(obj1.date)
            .add(this.state.timeInterval, "minutes")
            .format("YYYY-MM-DD HH:mm"),
          notification: 0,
          message: "Answer: " + obj.back,
          userId: this.state.userId,
          type: "deck",
          deckId: this.state.deckId,
          flashcardId: data.data.id,
          front: false,
        };

        axios.post("/api/appointment", obj1).then((data) => {
          axios.post("/api/appointment", obj2).then((data) => {
            // console.log(data)
            this.getDeckAppts();
          });
        });
      }

      this.setState({
        front: "",
        back: "",
        editSaved: false,
      });

      this.getFlashcards();
    });
  };

  saveFlashcardChanges = (id, index) => {
    let obj = {
      front: this.state.flashcards[index].front,
      back: this.state.flashcards[index].back,
    };

    let frontObj = {
      message: "Daily question: " + this.state.flashcards[index].front,
      front: true,
    };

    let backObj = {
      message: "Answer: " + this.state.flashcards[index].back,
      front: false,
    };

    axios.put("/api/flashcard/" + id, obj).then((data) => {
      console.log(data);
      this.getFlashcards();
      axios
        .put("/api/appointments/flashcard/" + id, frontObj)
        .then((response) => {
          console.log(response);
        });
      axios
        .put("/api/appointments/flashcard/" + id, backObj)
        .then((response) => {
          console.log(response);
          this.setState({
            editSaved: true,
            editId: index,
          });
        });
    });
  };

  //deck settings
  saveSettings = () => {
    let obj = {
      private: this.state.privacy,
      dailyQuiz: this.state.sendAlert,
      time: this.state.alertTime,
      alertInterval: this.state.timeInterval,
    };

    axios.put("/api/decks/" + this.state.deckId, obj).then((data) => {
      // console.log(data);
      this.toggleSettings();
      console.log(obj.dailyQuiz);
      console.log(this.state.deck.dailyQuiz);

      //create appointment if user chooses to get daily questions
      if (obj.dailyQuiz === true && this.state.deck.dailyQuiz === false) {
        this.createAppointments();
      } else {
        //else delete appointments (if alerts were updated, they will be deleted and created again)
        axios
          .delete(
            `/api/appointments/decks/${this.state.deckId}/${this.state.userId}`
          )
          .then(() => {
            this.getDeckAppts();
            if (obj.dailyQuiz) {
              this.createAppointments();
            }
          });
      }

      if (!this.state.phoneNumberSaved && this.state.phone !== "") {
        let phoneObj = {
          phoneNumber: this.state.phone.replace(/\D/g, ""),
        };
        axios.put("/api/users/" + this.state.userId, phoneObj).then((data) => {
          // console.log(data);
          this.setState({
            phoneNumberSaved: true,
          });

          let eventDate = moment(Date.now())
            .add(1, "minutes")
            .format("YYYY-MM-DD HH:mm");
          let newObj = {
            date: eventDate,
            notification: 0,
            message:
              "You will be receiving Daily Quizzes to this number. Text STOP to unsubscribe.",
            type: "initial text",
            userId: this.state.userId,
          };
          axios.post("/api/appointment", newObj).then((data) => {
            console.log(data);
          });
        });
      }
    });
  };

  // getDeckSettings = () => {
  //   this.toggleSettings()

  //   axios.get("/api/decks/" + this.state.deckId)
  //   .then(data => {
  //     this.setState({
  //       deck: {...data.data},
  //       privacy: data.data.private,
  //       sendAlert: data.data.dailyQuiz,
  //       alertTime: data.data.time,
  //       timeInterval: data.data.alertInterval
  //     })
  //   })
  // };

  createAppointments = () => {
    // console.log("creating appts");
    // console.log(this.state.flashcards)
    this.state.flashcards.map((item, index) => {
      let eventDate = moment(this.state.alertTime, "HH:mm")
        .add(index, "days")
        .format("YYYY-MM-DD HH:mm");
      let obj = {
        date: eventDate,
        notification: 0,
        message: "Daily question: " + item.front,
        userId: this.state.userId,
        type: "deck",
        deckId: this.state.deckId,
        flashcardId: item.id,
        front: true,
      };
      axios.post("/api/appointment", obj).then((data) => {
        // console.log(data);
        obj.date = moment(this.state.alertTime, "HH:mm")
          .add(index, "days")
          .add(this.state.timeInterval, "minutes")
          .format("YYYY-MM-DD HH:mm");
        obj.message = "Answer: " + item.back;
        obj.front = false;

        axios.post("/api/appointment", obj).then((data) => {
          // console.log(data);
          this.getDeckAppts();
        });
      });

      return null;
    });
  };

  handleFrontInputChange = (event) => {
    this.setState({
      front: DOMPurify.sanitize(event.target.value),
    });
  };

  handleBackInputChange = (event) => {
    this.setState({
      back: DOMPurify.sanitize(event.target.value),
    });
  };

  handleFrontEdit = (index, event) => {
    let flashcards = [...this.state.flashcards];
    flashcards[index].front = DOMPurify.sanitize(event.target.value);
    this.setState({ flashcards });
  };

  handleBackEdit = (index, event) => {
    let flashcards = [...this.state.flashcards];
    flashcards[index].back = DOMPurify.sanitize(event.target.value);
    this.setState({ flashcards });
  };

  handlePrivacyChange = () => {
    // console.log(!this.state.privacy);
    this.setState({
      privacy: !this.state.privacy,
    });
  };

  handleAlertChange = () => {
    // console.log(!this.state.sendAlert);
    this.setState({
      sendAlert: !this.state.sendAlert,
    });
  };

  handleAlertTimeChange = (event) => {
    // console.log(moment(event.target.value, "HH:mm").format("YYYY-MM-DD HH:mm"))
    this.setState({
      alertTime: DOMPurify.sanitize(event.target.value),
    });
  };

  handleSelectChange = (event) => {
    this.setState({
      timeInterval: DOMPurify.sanitize(event.target.value),
    });
  };

  handlePhoneChange = (event) => {
    // console.log(event.target.value.replace(/\D/g, ''))
    this.setState({
      phone: DOMPurify.sanitize(event.target.value),
    });
  };

  toggle = () => {
    this.setState({
      edit: !this.state.edit,
    });
  };

  toggleSettings = () => {
    this.setState({
      openSettings: !this.state.openSettings,
    });
  };

  render() {
    //============== Card Stack==============//
    const edit = this.state.edit;
    let showCardStack, emptyDeckValidation;

    if (!this.state.flashcards.length) {
      emptyDeckValidation = (
        <main className="carousel__items empty-deck">
          <div />
          <Flippy
            flipOnHover={false}
            flipOnClick={true}
            flipDirection="horizontal"
            ref={(r) => (this.Flippy = r)}
            style={{ width: "400px", height: "200px" }}
          >
            <FrontSide style={{ backgroundColor: "#93bbde" }}>
              <p className="flippy-text">
                This deck currently has no flashcards.
                <br />
                Click on the <strong>Show flashcards</strong> button to start
                creating flashcards.
              </p>
            </FrontSide>
            <BackSide style={{ backgroundColor: "#66b361" }}>
              <p className="flippy-text">
                If you do not want your deck to be public, click on the{" "}
                <strong>Settings</strong> button next to{" "}
                <em>Show flashcards</em> and set the deck to private.
              </p>
            </BackSide>
          </Flippy>
          <div />
        </main>
      );
    }

    if (edit === true) {
      showCardStack = (
        // isOpen=""
        <div className="animated slideInUp" id="flashcard-grid">
          <Row>
            <Col>
              <Card className="flashcard animated bounceInUp">
                <CardBody>
                  <CardTitle>
                    <label htmlFor="front">Front</label>
                    <textarea
                      className="flashcard__input"
                      value={this.state.front}
                      onChange={this.handleFrontInputChange}
                      type="textarea"
                      name="text"
                      id="front"
                      maxLength={inputMaxLength}
                    />
                  </CardTitle>
                  <CardText>
                    <label htmlFor="back">Back</label>
                    <textarea
                      className="flashcard__input"
                      value={this.state.back}
                      onChange={this.handleBackInputChange}
                      type="textarea"
                      name="text"
                      id="back"
                      maxLength={inputMaxLength}
                    />
                  </CardText>
                </CardBody>
                <Button
                  type="submit"
                  onClick={this.createFlashcard}
                  className="flashcard__create-btn"
                  color="success"
                >
                  <i className="fas fa-plus" /> Create flashcard
                </Button>
              </Card>
            </Col>
          </Row>
          <Row>
            {this.state.flashcards.map((item, index) => {
              return (
                <Col key={item.id}>
                  <Card className="flashcard animated flip">
                    <section className="delete-btn-grid">
                      <div />
                      <div />
                      <div />
                      <div />
                      <button
                        className="flashcard__delete-btn"
                        type="button"
                        onClick={() => this.deleteFlashcard(item.id)}
                      >
                        <span className="flashcard__delete-span">Delete</span>{" "}
                        <i className="fas fa-trash-alt" />
                      </button>
                    </section>
                    <CardBody>
                      <CardTitle>
                        Front
                        <textarea
                          type="textarea"
                          className="flashcard__input"
                          value={this.state.flashcards[index].front}
                          onChange={(event) =>
                            this.handleFrontEdit(index, event)
                          }
                          maxLength={inputMaxLength}
                        />
                      </CardTitle>
                      <CardText>
                        Back
                        <textarea
                          type="textarea"
                          className="flashcard__input"
                          value={this.state.flashcards[index].back}
                          onChange={(event) =>
                            this.handleBackEdit(index, event)
                          }
                          maxLength={inputMaxLength}
                        />
                      </CardText>
                      <p style={{ color: "green" }}>
                        {this.state.editSaved && this.state.editId === index
                          ? "Flashcard Saved!"
                          : ""}
                      </p>
                      <section style={{ textAlign: "center" }}>
                        <button
                          className="flashcard__save-changes-btn"
                          onClick={() =>
                            this.saveFlashcardChanges(item.id, index)
                          }
                          type="button"
                        >
                          <i className="fas fa-save" /> Save changes
                        </button>
                      </section>
                    </CardBody>
                  </Card>
                </Col>
              );
            })}
          </Row>
        </div>
      );
    } else if (edit === false) {
      showCardStack = (
        // isOpen=""
        <div className="animated fadeOut" id="flashcard-grid" />
      );
    }

    //========== request phone number if alert are turned on ========//
    let phoneRequest;
    if (!this.state.phoneNumberSaved && this.state.sendAlert) {
      phoneRequest = (
        <Row style={{ margin: "auto" }}>
          <Col>
            <label>Enter phone number:</label>
          </Col>
          <Col>
            <input
              type="tel"
              className="phone-input"
              maxLength="15"
              value={this.state.phone}
              onChange={this.handlePhoneChange}
            />
          </Col>
        </Row>
      );
    } else {
      phoneRequest = "";
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
              {/* <Row> */}
              <section className="grid-row">
                <h1 className="text-center">Settings</h1>
                <div />
                <div />
                <div />
                <Button
                  className="settings-modal__close-btn"
                  onClick={this.toggleSettings}
                >
                  <i className="fas fa-times" />
                </Button>
              </section>
              {/* </Row> */}
            </ModalHeader>
            <ModalBody>
              <Row style={{ margin: "auto" }}>
                <Col>
                  <p>Make deck private</p>
                </Col>
                <Col>
                  <label
                    className="switch"
                    style={{ position: "relative", top: "-4px" }}
                  >
                    <Input
                      type="checkbox"
                      onChange={this.handlePrivacyChange}
                      checked={this.state.privacy ? "checked" : ""}
                    />
                    <span className="toggle-slider round" />
                  </label>
                </Col>
              </Row>
              <Row style={{ margin: "auto" }}>
                <Col>
                  <p>Send text message</p>
                </Col>
                <Col>
                  <label
                    className="switch"
                    style={{ position: "relative", top: "-4px" }}
                  >
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
                  <p style={{ textAlign: "left" }}>
                    Starting tomorrow, send Daily Questions at{" "}
                  </p>
                </Col>
                <Col>
                  <div className="control">
                    <input
                      type="time"
                      id="appt-time-input"
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
                  className="minutes-select"
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
                  <p>minute(s).</p>
                </Col>
              </Row>
              {phoneRequest}
              <hr />
              <Row>
                <button id="deck-setting-save-btn" onClick={this.saveSettings}>
                  <i className="fas fa-save" /> Save changes
                </button>
              </Row>
            </ModalBody>
          </Modal>
        </div>
      );
    }

    return (
      <div>
        {/* Logout redirection */}
        {this.props.handleUserRedirect()}

        <Menu>
          <Sidebar handleUserLogout={this.props.handleUserLogout} />
        </Menu>

        <h1
          className="text-center"
          style={{
            marginTop: "70px",
          }}
        >
          {this.state.deckName}
        </h1>
        <hr />
        <Carousel className="carousel">
          {this.state.flashcards.map((item) => {
            return (
              <main className="carousel__items" key={item.id}>
                <div
                // style={{border: "5px dotted limeGreen", cursor: "none !important"}}
                />
                <Flippy
                  flipOnHover={false}
                  flipOnClick={true}
                  flipDirection="horizontal"
                  ref={(r) => (this.Flippy = r)}
                  style={{ width: "400px", height: "200px" }}
                >
                  <FrontSide style={{ backgroundColor: "#93bbde" }}>
                    <p className="flippy-text">{item.front}</p>
                  </FrontSide>

                  <BackSide style={{ backgroundColor: "#66b361" }}>
                    <p className="flippy-text">{item.back}</p>
                  </BackSide>
                </Flippy>
                <div
                // style={{border: "5px dotted limeGreen", cursor: "none !important"}}
                />
              </main>
            );
          })}
          {emptyDeckValidation}
        </Carousel>
        <div className="deck-options">
          <ButtonGroup>
            <Button
              className="deck-options__edit-flashcards-btn"
              data-balloon="Edit flashcards inside the deck"
              data-balloon-pos="up"
              style={{ outline: "none !important" }}
              color="primary"
              onClick={this.toggle}
            >
              Show flashcards
            </Button>
            <Button
              className="deck-options__deck-settings-btn"
              color="dark"
              onClick={this.toggleSettings}
              data-balloon="Settings"
              data-balloon-pos="up"
              style={{ outline: "none" }}
            >
              <i className="fas fa-cogs" /> Settings
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
