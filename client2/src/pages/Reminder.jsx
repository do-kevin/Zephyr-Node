import React, { Component } from "react";
import moment from "moment-timezone";
import axios from "axios";

import Sidebar from "../components/Sidebar.jsx";
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  Label,
  Input,
  Card,
  CardTitle,
  CardText,
  Col,
  Row,
} from "reactstrap";
import DateTimePicker from "react-datetime-picker";
import styled from "styled-components";

import "../css/Reminder.scss";

const Menu = styled.div`
  #sidebar {
    top: 0;
  }
  .sidebar-nav__link--reminders {
    background: hsla(214, 100%, 96%, 1);
    box-shadow: 0px 2px 1px #888, 0px -2px 1px #888;
    border-left: 5px solid hsla(220, 15%, 23%, 1);
  }
  .sidebar-nav__link--reminders .sidebar-nav__text {
    color: black;
  }
`;

const Title = styled.section`
  .card-title {
    font-size: 36px;
    margin-bottom: -25px;
  }
`;

let dateInputPx = 364;

const Calendar = styled.section`
  .react-datetime-picker__wrapper {
    width: 320px;
    border: none;
    @media (max-width: ${dateInputPx}px) {
      position: relative;
      left: -46px;
    }
  }
  .react-datetime-picker__inputGroup__input {
    background: hsla(220, 17%, 95%, 1);
    border-bottom: 2px solid hsl(0, 0%, 77%);
    margin: 0 1px;
    box-shadow: inset 0 1px 10px 2px hsl(0, 0%, 90%);
    outline: none !important;
    border-radius: 5px;
    font-weight: 400;
    padding: 0 5px;
    @media (max-width: ${dateInputPx}px) {
      font-weight: 400;
    }
  }
  .react-datetime-picker__clear-button {
    box-shadow: 0 2px 8px rgb(124, 124, 124), 0 2px 2px rgb(187, 187, 187);
    border: 1px solid red;
    border-top: 3px solid red;
    outline: none !important;
    border-radius: 5px;
    margin-left: 7px;
  }
  .react-datetime-picker__clear-button:hover,
  .react-datetime-picker__clear-button:active {
    outline: none !important;
    border-radius: 5px;
    transition: box-shadow 150ms;
    box-shadow: 0 7px 8px rgb(124, 124, 124), 0 2px 2px rgb(187, 187, 187);
    position: relative;
    top: -1px;
  }
  .react-datetime-picker__calendar-button {
    box-shadow: 0 2px 8px rgb(124, 124, 124), 0 2px 2px rgb(187, 187, 187);
    border: 1px solid dodgerblue;
    border-top: 3px solid dodgerblue;
    outline: none !important;
    border-radius: 5px;
    margin-left: 7px;
  }
  .react-datetime-picker__calendar-button:hover,
  .react-datetime-picker__calendar-button:active {
    outline: none !important;
    border-radius: 5px;
    transition: box-shadow 150ms;
    position: relative;
    top: -1px;
    box-shadow: 0 7px 8px rgb(124, 124, 124), 0 2px 2px rgb(187, 187, 187);
  }
  .react-datetime-picker--open .react-datetime-picker__calendar-button {
    outline: none !important;
    border-top: 1px solid dodgerblue;
    border-bottom: 4px solid dodgerblue;
    border-radius: 5px;
    transition: box-shadow 150ms;
    position: relative;
    top: -1px;
    box-shadow: 0 7px 8px rgb(124, 124, 124), 0 2px 2px rgb(187, 187, 187);
  }
  .react-calendar {
    box-shadow: 0 2px 8px rgb(124, 124, 124), 0 2px 2px rgb(187, 187, 187);
    margin-top: 7px;
    margin-bottom: 15px;
    @media (max-width: 430px) {
      left: -46px;
      top: 7px;
      position: relative;
      margin: auto;
      width: 300px;
    }
    .react-calendar__navigation {
      border-top: 5px solid dodgerblue;
    }
  }
`;

class Reminder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      item: "",
      note: "",
      date: new Date(),
      modal: false,
      phoneNumberSaved: false,
      phone: "",
      sendReminder: false,
      alertTime: 0,
      saveClicked: false,
      events: [],
      currentModal: "",
      editingObj: {},
      userId: null,
    };
  }

  componentDidMount() {
    console.log("start");
    try {
      const userId = JSON.parse(localStorage.getItem("user")).id,
        redirect = !userId;
      if (userId) {
        this.setState(
          () => ({ userId, redirect }),
          () => {
            this.getReminders();
            this.getUserInfo();
          }
        );
      }
    } catch (err) {
      console.log(err);
    }
  }

  getReminders = () => {
    console.log(this.state.userId);
    axios.get("/api/reminders/users/" + this.state.userId).then((data) => {
      console.log(data);
      this.setState({
        events: data.data,
      });
    });
  };

  getUserInfo = () => {
    axios.get("/api/user/" + this.state.userId).then((data) => {
      console.log(data);
      if (data.data[0].phoneNumber !== null) {
        this.setState({
          phoneNumberSaved: true,
        });
      }
    });
  };

  toggle = () => {
    this.setState({
      modal: !this.state.modal,
    });
    this.clearModal();
  };

  createEvent = () => {
    this.setState({ currentModal: "create" });
    this.toggle();
  };

  editEvent = (id, index) => {
    console.log(id);
    this.setState({ currentModal: "edit" });
    this.toggle();
    let obj = { ...this.state.events[index] };
    let convertDate = new Date(obj.date);
    convertDate.setHours(convertDate.getHours() + 8);
    this.setState({
      item: obj.item,
      note: obj.note,
      date: convertDate,
      // moment(obj.date.replace(":00.000Z", "").replace("T", " ")).format("YYYY-MM-DD HH:mm"),
      sendReminder: obj.sendAlert,
      editingObj: obj,
    });
    if (obj.sendAlert) {
      this.setState({ alertTime: obj.alertTime });
    }
  };

  handleSubjectChange = (event) => {
    // console.log(event.target.value)
    this.setState({
      item: event.target.value,
    });
  };

  handleDateChange = (date) => {
    console.log(date);
    this.setState({ date });
  };

  handleNoteChange = (event) => {
    // console.log(event.target.value)
    this.setState({
      note: event.target.value,
    });
  };

  handleAlertChange = () => {
    // console.log(!this.state.privacy);
    this.setState({
      sendReminder: !this.state.sendReminder,
    });
  };

  // checkboxChange = event => {
  //   this.setState({
  //     sendReminder: event.target.checked
  //   });
  //   console.log(event.target.checked);
  // };

  handleSelectChange = (event) => {
    this.setState({
      alertTime: event.target.value,
    });
    // console.log(event.target.value)
  };

  handlePhoneChange = (event) => {
    console.log(event.target.value.replace(/\D/g, ""));
    this.setState({
      phone: event.target.value,
    });
  };

  //saves any edits done to the selected event
  saveEventChanges = () => {
    let eventObj = {
      id: this.state.editingObj.id,
      item: this.state.item,
      note: this.state.note,
      date: moment(this.state.date).format("YYYY-MM-DD HH:mm"),
      sendAlert: this.state.sendReminder,
      userId: this.state.userId,
    };
    if (this.state.sendReminder) {
      eventObj.alertTime = this.state.alertTime;
    } else {
      eventObj.alertTime = null;
    }

    this.setState({
      modal: !this.state.modal,
    });

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
            "You will be receiving event reminders to this number. Text STOP to unsubscribe.",
          type: "initial text",
          userId: this.state.userId,
        };
        axios.post("/api/appointment", newObj).then((data) => {
          console.log("phone number set - " + data);
        });
      });
    }

    axios.put("/api/reminders", eventObj).then((data) => {
      console.log(data);
      let eventDate = moment(eventObj.date).format("YYYY-MM-DD HH:mm");
      let obj = {
        date: eventDate,
        notification: eventObj.alertTime,
        message: `You have an upcoming event: ${eventObj.item} on ${moment(
          eventDate
        ).format("MMMM D")} at ${moment(eventDate).format("hh:mm A")}`,
        userId: this.state.userId,
        type: "reminder",
        reminderId: eventObj.id,
      };

      //if event was changed to send to an alert, create a new appointment
      if (
        this.state.editingObj.sendAlert === false &&
        eventObj.sendAlert === true
      ) {
        console.log("create appt");

        axios.post("/api/appointment", obj).then(function (data) {
          console.log(data);
        });
      }
      //if existing appointment's date and/or alert time were edited, update appointment
      else if (
        this.state.editingObj.sendAlert &&
        eventObj.sendAlert &&
        (this.state.editingObj.alertTime !== eventObj.alertTime ||
          this.state.editingObj.date !== eventObj.date)
      ) {
        console.log("update appt");
        console.log(obj);
        axios.put("/api/appointments/reminders", obj).then(function (data) {
          console.log(data);
        });
      }
      //if existing alert was turned off, delete existing appointment
      else if (
        this.state.editingObj.sendAlert === true &&
        eventObj.sendAlert === false
      ) {
        console.log("delete appt");
        console.log(obj.reminderId);
        axios
          .delete("/api/appointments/reminders/" + obj.reminderId)
          .then(function (data) {
            console.log(data);
          });
      }
      this.getReminders();
    });
  };

  //saves new event
  saveEvent = () => {
    if (this.state.item !== "") {
      let eventObj = {
        item: this.state.item,
        note: this.state.note,
        date: moment(this.state.date).format("YYYY-MM-DD HH:mm"),
        sendAlert: this.state.sendReminder,
        userId: this.state.userId,
      };
      if (this.state.sendReminder) {
        eventObj.alertTime = this.state.alertTime;
      }

      this.setState({
        modal: !this.state.modal,
      });
      console.log(eventObj);

      axios.post("/api/reminder", eventObj).then((data) => {
        //updates array of events in state to update the page display
        // this.setState({events: [...this.state.events, data.data]})

        if (this.state.sendReminder) {
          let eventDate = moment(this.state.date).format("YYYY-MM-DD HH:mm");
          let obj = {
            date: eventDate,
            notification: this.state.alertTime,
            message: `You have an upcoming event: ${
              this.state.item
            } on ${moment(eventDate).format("MMMM D")} at ${moment(
              eventDate
            ).format("HH:mm")}`,
            userId: this.state.userId,
            type: "reminder",
            reminderId: data.data.id,
          };
          axios.post("/api/appointment", obj).then(function (data) {
            console.log(data);
          });

          if (!this.state.phoneNumberSaved && this.state.phone !== "") {
            let phoneObj = {
              phoneNumber: this.state.phone.replace(/\D/g, ""),
            };
            axios
              .put("/api/users/" + this.state.userId, phoneObj)
              .then((data) => {
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
                    "You will be receiving event reminders to this number. Text STOP to unsubscribe.",
                  type: "initial text",
                  userId: this.state.userId,
                };
                axios.post("/api/appointment", newObj).then((data) => {
                  // console.log("phone number set - " + data);
                });
              });
          }
        }

        this.getReminders();
      });
    } else {
      this.setState({ saveClicked: true });
    }
  };

  deleteEvent = (id) => {
    axios.delete("/api/appointments/reminders/" + id).then((data) => {
      // console.log(data);
      axios.delete("/api/reminders/" + id).then((data) => {
        console.log(data);
        this.getReminders();
      });
    });
  };

  //resets all states settings on the modal whenever it's opened or closed
  clearModal = () => {
    this.setState({
      item: "",
      note: "",
      date: new Date(),
      checkbox: false,
      alert: 0,
      saveClicked: false,
      sendReminder: false,
      alertTime: 0,
    });
  };

  render() {
    //************buttons and onClick functions on the modal, depending on which button was clicked (create or edit event)
    let modalDisplay;
    if (this.state.modal && this.state.currentModal === "create") {
      modalDisplay = (
        <ModalFooter>
          <button
            className="reminders-btn reminders-btn--primary"
            color="primary"
            onClick={this.saveEvent}
          >
            Save reminder
          </button>
        </ModalFooter>
      );
    } else if (this.state.modal && this.state.currentModal === "edit") {
      modalDisplay = (
        <ModalFooter style={{ justifyContent: "center" }}>
          <button
            className="reminders-btn reminders-btn--primary"
            color="primary"
            onClick={this.saveEventChanges}
          >
            Save changes
          </button>
        </ModalFooter>
      );
    }

    //******** dropdown menu display if user chooses to send alerts
    let alertOpts;
    if (this.state.sendReminder) {
      alertOpts = (
        <FormGroup className="select-time-group">
          <Input
            type="select"
            name="select"
            className="select-dropdown"
            onChange={this.handleSelectChange}
          >
            <option
              value="0"
              selected={this.state.alertTime === 0 ? "selected" : ""}
            >
              At time of the event
            </option>
            <option
              value="15"
              selected={this.state.alertTime === 15 ? "selected" : ""}
            >
              15 mins before event
            </option>
            <option
              value="30"
              selected={this.state.alertTime === 30 ? "selected" : ""}
            >
              30 mins before event
            </option>
            <option
              value="60"
              selected={this.state.alertTime === 60 ? "selected" : ""}
            >
              1 hour before event
            </option>
            <option
              value="120"
              selected={this.state.alertTime === 120 ? "selected" : ""}
            >
              2 hours before event
            </option>
          </Input>
        </FormGroup>
      );
    } else {
      alertOpts = "";
    }

    //******** validation text if title is not filled out on modal
    let validation;
    if (this.state.item === "" && this.state.saveClicked) {
      validation = (
        <div>
          <p className="validation">The reminder requires a title</p>
        </div>
      );
    } else {
      validation = "";
    }

    //========== request phone number if alert are turned on ========//
    let phoneRequest;
    if (!this.state.phoneNumberSaved && this.state.sendReminder) {
      phoneRequest = (
        <Row
          style={{
            margin: "auto",
            maxWidth: "421px",
            position: "relative",
            left: "9px",
          }}
        >
          <Col>
            <label>Enter phone number</label>
            <input
              type="tel"
              className="phone-input"
              value={this.state.phone}
              onChange={this.handlePhoneChange}
              style={{ background: "hsla(220, 17%, 95%, 1)" }}
            />
          </Col>
        </Row>
      );
    } else {
      phoneRequest = "";
    }

    return (
      <div>
        {/* Logout Redirection */}
        {this.props.handleUserRedirect()}

        <Menu>
          <Sidebar handleUserLogout={this.props.handleUserLogout} />
        </Menu>

        <main className="container">
          <div className="row">
            <Card className="event-btn-container">
              <button
                className="reminders-btn reminders-btn--dark"
                onClick={this.createEvent}
              >
                <i className="fas fa-plus"></i> Add Event
              </button>
            </Card>
          </div>
          <br />
          <div id="wrapper">
            {/**************Display of existing events****************/}
            {this.state.events.map((item, index) => {
              return (
                <Row key={item.id}>
                  <Col>
                    <Card body className="event-item animated lightSpeedIn">
                      <Title>
                        <CardTitle>{item.item}</CardTitle>
                      </Title>
                      <hr style={{ marginBottom: "-2px" }} />
                      <CardText>
                        <span
                          className="d-block"
                          style={{
                            color: "hsla(180, 85%, 35%, 1)",
                            fontWeight: 500,
                          }}
                        >
                          {moment(item.date).format("ddd, MMMM D")} at{" "}
                          {moment(
                            item.date.replace(":00.000Z", "").replace("T", " ")
                          ).format("hh:mma")}
                        </span>
                        <span className="d-block">{item.note}</span>
                      </CardText>
                      <div>
                        <button
                          style={{ marginRight: "10px" }}
                          className="reminders-btn reminders-btn--primary"
                          onClick={() => this.editEvent(item.id, index)}
                        >
                          <i className="fas fa-edit" /> EDIT
                        </button>
                        <button
                          className="delete-reminder-btn"
                          onClick={() => this.deleteEvent(item.id)}
                        >
                          <i className="fas fa-trash-alt" /> DELETE
                        </button>
                      </div>
                    </Card>
                  </Col>
                </Row>
              );
            })}
          </div>
        </main>

        <Modal
          isOpen={this.state.modal}
          toggle={this.toggle}
          id="modal-position"
        >
          <ModalHeader toggle={this.toggle}>Create Event</ModalHeader>
          <ModalBody className="modal-body">
            <Form className="modal-form">
              <FormGroup>
                <Label for="item">Title</Label>
                <input
                  type="text"
                  className="create-reminder-input"
                  value={this.state.item}
                  onChange={this.handleSubjectChange}
                />
                {validation}
              </FormGroup>
              <FormGroup>
                <Label for="notes">Description (optional)</Label>
                <input
                  type="textarea"
                  className="create-reminder-input"
                  value={this.state.note}
                  onChange={this.handleNoteChange}
                />
              </FormGroup>
              <hr />
              <p style={{ marginBottom: 0 }}>Date & Time (PST)</p>
              <Calendar>
                <DateTimePicker
                  className="date-format"
                  maxDetail="minute"
                  onChange={this.handleDateChange}
                  value={this.state.date}
                />
              </Calendar>
              <Row className="alert-format">
                <Col>
                  <span
                    style={{
                      position: "relative",
                      top: "5px",
                    }}
                  >
                    Send Alert
                  </span>
                </Col>
                <Col className="toggle-format">
                  <Label className="switch">
                    <Input
                      type="checkbox"
                      onChange={this.handleAlertChange}
                      checked={this.state.sendReminder ? "checked" : ""}
                    />
                    <span className="toggle-slider round" />
                  </Label>
                </Col>
              </Row>
            </Form>
            {alertOpts}
            {phoneRequest}
          </ModalBody>
          {modalDisplay}
        </Modal>
      </div>
    );
  }
}

export default Reminder;
