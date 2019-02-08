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
  Label,
  Input
} from "reactstrap";
import DOMPurify from "dompurify";
import styled from 'styled-components';

import Sidebar from "../components/Sidebar";

import '../css/PlayCards/PlayCards.css'

const Menu = styled.menu`
  #sidebar {
    top: 0;
  }
  .sidebar-nav__link--decks {
    background: white;
    box-shadow: 0px 2px 1px #888, 0px -2px 1px #888;
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
      deckId: JSON.parse(sessionStorage.getItem("deckId"))
    };

    // this.refs.cardList;
    this.toggle = this.toggle.bind(this);
    this.toggleSettings = this.toggleSettings.bind(this);
  }

  componentDidMount() {
    this.getFlashcards();
    this.getDeckInfo();
    this.getUserInfo();
    this.getDeckAppts();
    console.log(this.props.user);
  }

  getFlashcards = () => {
    axios.get("/flashcard/" + this.state.deckId).then(data => {
      console.log(data.data);
      this.setState({
        flashcards: [...data.data]
      });
    });
  };

  getDeckInfo = () => {
    axios.get("/decks/" + this.state.deckId).then(data => {
      // console.log(data.data)
      this.setState({
        deckName: data.data.subject,
        privacy: data.data.private,
        sendAlert: data.data.dailyQuiz,
        alertTime: data.data.time,
        timeInterval: data.data.alertInterval,
        deck: { ...data.data }
      });
    });
  };

  getUserInfo = () => {
    axios.get("/user/" + this.state.userId).then(data => {
      console.log(data.data)
      if (data.data[0].phoneNumber !== null) {
        this.setState({
          phoneNumberSaved: true
        });
      }
    });
  };

  getDeckAppts = () => {
    axios
      .get(`/appointments/decks/${this.state.deckId}/${this.state.userId}`)
      .then(data => {
        console.log(data.data);
        this.setState({
          appts: [...data.data]
        });
      });
  };

  deleteFlashcard = id => {
    axios.delete("/flashcards/" + id).then(data => {
      console.log(data);
      this.getFlashcards();
      axios.delete("/appointments/decks/" + id)
        .then(response => {
          console.log(response)
        })
    });
  };

  createFlashcard = () => {
    let obj = {
      front: this.state.front,
      back: this.state.back,
      deckId: this.state.deckId
    };

    axios.post("/flashcard", obj).then(data => {
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
          front: true
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
          front: false
        };

        axios.post("/appointment", obj1).then(data => {
          axios.post("/appointment", obj2).then(data => {
            // console.log(data)
            this.getDeckAppts();
          });
        });
      }

      this.setState({
        front: "",
        back: "",
        editSaved: false
      });

      this.getFlashcards();
    });
  };

  saveFlashcardChanges = (id, index) => {
    let obj =  {
      front: this.state.flashcards[index].front,
      back: this.state.flashcards[index].back
    };

    let frontObj = {
      message: "Daily question: " + this.state.flashcards[index].front,
      front: true
    }

    let backObj = {
      message: "Answer: " + this.state.flashcards[index].back,
      front: false
    }

    axios.put("/flashcard/" + id, obj).then(data => {
      console.log(data);
      this.getFlashcards();
      axios.put("/appointments/flashcard/" + id, frontObj)
        .then(response => {
          console.log(response)
        })
        axios.put("/appointments/flashcard/" + id, backObj)
        .then(response => {
          console.log(response)
          this.setState({
            editSaved: true,
            editId: index
          })
        })

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

    axios.put("/decks/" + this.state.deckId, obj).then(data => {
      // console.log(data);
      this.toggleSettings();
      console.log(obj.dailyQuiz);
      console.log(this.state.deck.dailyQuiz);

      //create appointment if user chooses to get daily questions
      if (obj.dailyQuiz === true && this.state.deck.dailyQuiz === false) {
        this.createAppointments();
      }
      //else delete appointments (if alerts were updated, they will be deleted and created again)
      else {
        axios
          .delete(
            `/appointments/decks/${this.state.deckId}/${this.state.userId}`
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
          phoneNumber: this.state.phone.replace(/\D/g, "")
        };
        axios.put("/users/" + this.state.userId, phoneObj).then(data => {
          // console.log(data);
          this.setState({
            phoneNumberSaved: true
          });
  
          let eventDate = moment(Date.now()).add(1, "minutes").format("YYYY-MM-DD HH:mm");          
          let newObj = {
            date: eventDate,
            notification: 0,
            message: "You will be receiving Daily Quizzes to this number. Text STOP to unsubscribe.",
            type: "initial text",
            userId: this.state.userId
          };
          axios.post("/appointment", newObj).then(data => {
            console.log(data);
          });
        });
      }
    });
  };

  // getDeckSettings = () => {
  //   this.toggleSettings()

  //   axios.get("/decks/" + this.state.deckId)
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
        front: true
      };
      axios.post("/appointment", obj).then(data => {
        // console.log(data);
        obj.date = moment(this.state.alertTime, "HH:mm")
          .add(index, "days")
          .add(this.state.timeInterval, "minutes")
          .format("YYYY-MM-DD HH:mm");
        obj.message = "Answer: " + item.back;
        obj.front = false;

        axios.post("/appointment", obj).then(data => {
          // console.log(data);
          this.getDeckAppts();
        });
      });
    });
  };

  handleFrontInputChange = event => {
    this.setState({
      front: (DOMPurify.sanitize(event.target.value))
    });
  };

  handleBackInputChange = event => {
    this.setState({
      back: (DOMPurify.sanitize(event.target.value))
    });
  };

  handleFrontEdit = (index, event) => {
    let flashcards = [...this.state.flashcards];
    flashcards[index].front = (DOMPurify.sanitize(event.target.value));
    this.setState({ flashcards });
  };

  handleBackEdit = (index, event) => {
    let flashcards = [...this.state.flashcards];
    flashcards[index].back = (DOMPurify.sanitize(event.target.value));
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
      alertTime: (DOMPurify.sanitize(event.target.value))
    });
  };

  handleSelectChange = event => {
    this.setState({
      timeInterval: (DOMPurify.sanitize(event.target.value))
    });
  };

  handlePhoneChange = event => {
    // console.log(event.target.value.replace(/\D/g, ''))
    this.setState({
      phone: (DOMPurify.sanitize(event.target.value))
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
                          maxLength={inputMaxLength}
                        />
                      </CardTitle>
                      <CardText>
                        Back
                        <Input
                          value={this.state.flashcards[index].back}
                          onChange={event => this.handleBackEdit(index, event)}
                          maxLength={inputMaxLength}
                        />
                      </CardText>
                      <p className="p_font cardSaved">{this.state.editSaved && this.state.editId === index ? "Flashcard Saved!" : ""}</p>
                      <Button
                        onClick={() =>
                          this.saveFlashcardChanges(item.id, index)
                        }
                        type="button"
                        style={{
                          margin: "20px 41% 0 41%",
                          borderRadius: "25px"
                        }}
                        data-balloon="Save flashcard" data-balloon-pos="down"
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
                      maxLength={inputMaxLength}
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
                      maxLength={inputMaxLength}
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
                    data-balloon="Create flashcard" 
                    data-balloon-pos="down"
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

    //========== request phone number if alert are turned on ========//
    let phoneRequest;
    if (!this.state.phoneNumberSaved && this.state.sendAlert) {
      phoneRequest = (
        <Row style={{ margin: "auto" }}>
          <Col>
            <label>Enter Phone Number:</label>
          </Col>
          <Col>
            <input
              type="tel"
              className="phone-input"
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
              <Row>
                <Col>
                  <h1 className="text-center">Settings</h1>
                </Col>
                <Col id="close-deck-setting-container">
                  <Button onClick={this.toggleSettings}>
                    <i className="fas fa-times" />
                  </Button>
                </Col>
              </Row>
            </ModalHeader>
            <ModalBody>
              <Row style={{ margin: "auto" }}>
                <Col>
                  <p className="p_font">Make deck private</p>
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
                  <p className="p_font">Send text message</p>
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
                  <p className="p_font" style={{ textAlign: "left" }}>Starting tomorrow, send Daily Questions at </p>
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
                  <p className="p_font" style={{ textAlign: "left" }}>Send the answers every</p>
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
                  <p className="p_font">minutes.</p>
                </Col>
              </Row>
              {phoneRequest}
              <hr />
              <Row>
                <Button id="deck-setting-save-btn" color="primary" onClick={this.saveSettings}>
                <i className="fas fa-save"></i>
                </Button>
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
        
        <Menu><Sidebar handleUserLogout={this.props.handleUserLogout} /></Menu>

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
                  <p className="p_font">{item.front}</p>
                </FrontSide>

                <BackSide style={{ backgroundColor: "#66b361" }}>
                  <p className="p_font">{item.back}</p>
                </BackSide>
              </Flippy>
            );
          })}
        </Carousel>
        <div id="edit-btns">
          <ButtonGroup>
            <Button data-balloon="Edit flashcards inside the deck" data-balloon-pos="up" color="primary" id="edit-deck-btn" onClick={this.toggle}>
              Edit
            </Button>
            <Button
              id="settings-btn"
              color="dark"
              onClick={this.toggleSettings}
              data-balloon="Settings" data-balloon-pos="up"
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
