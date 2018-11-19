import React from "react";
import {Redirect} from "react-router-dom";
import moment from "moment-timezone";
import axios from "axios";

import Sidebar from "../components/Sidebar";
import {
  Button,
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
  Row
} from "reactstrap";
import DateTimePicker from "react-datetime-picker";
import "../css/Reminder.css";

class Reminder extends React.Component {
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
            userId: null
        };
    
        this.toggle = this.toggle.bind(this);
      }
    
    componentDidMount() {
        console.log("start")
        try {
          const userId = JSON.parse(localStorage.getItem("user")).id,
            redirect = !userId;
          if (userId) {
            this.setState(() => ({userId, redirect}), 
            () => {
              this.getReminders();
              this.getUserInfo();
            });
          }
        } catch (err) {
          console.log(err);
        }
    }
    
    getReminders = () => {
      console.log(this.state.userId)
        axios.get("/reminders/users/" + this.state.userId)
            .then (data => {
                console.log(data);
                this.setState({
                    events: data.data
                })
            }
        )
    }

    getUserInfo = () => {
      axios.get("/user/" + this.state.userId).then(data => {
        console.log(data)
        if (data.data[0].phoneNumber !== null) {
          this.setState({
            phoneNumberSaved: true
          });
        }
      });
    };

    toggle() {
        this.setState({
            modal: !this.state.modal
        });
        this.clearModal();
    }

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
      editingObj: obj
    });
    if (obj.sendAlert) {
      this.setState({ alertTime: obj.alertTime });
    }
  };

  handleSubjectChange = event => {
    // console.log(event.target.value)
    this.setState({
      item: event.target.value
    });
  };

  handleDateChange = date => {
    console.log(date);
    this.setState({ date });
  };

  handleNoteChange = event => {
    // console.log(event.target.value)
    this.setState({
      note: event.target.value
    });
  };

  handleAlertChange = () => {
    // console.log(!this.state.privacy);
    this.setState({
      sendReminder: !this.state.sendReminder
    });
  };

  // checkboxChange = event => {
  //   this.setState({
  //     sendReminder: event.target.checked
  //   });
  //   console.log(event.target.checked);
  // };

  handleSelectChange = event => {
    this.setState({
      alertTime: event.target.value
    });
    // console.log(event.target.value)
  };

  handlePhoneChange = event => {
    console.log(event.target.value.replace(/\D/g, ''))
    this.setState({
      phone: event.target.value
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
      userId: this.state.userId
    };
    if (this.state.sendReminder) {
      eventObj.alertTime = this.state.alertTime;
    } else {
      eventObj.alertTime = null;
    }

    this.setState({
      modal: !this.state.modal
    });

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
          message: "You will be receiving event reminders to this number. Text STOP to unsubscribe.",
          type: "initial text",
          userId: this.state.userId
        };
        axios.post("/appointment", newObj).then(function(data) {
          console.log("phone number set - " + data);
        });
      });
    }

    axios.put("/reminders", eventObj).then(data => {
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
        reminderId: eventObj.id
      };

      //if event was changed to send to an alert, create a new appointment
      if (
        this.state.editingObj.sendAlert === false &&
        eventObj.sendAlert === true
      ) {
        console.log("create appt");

        axios.post("/appointment", obj).then(function(data) {
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
        console.log(obj)
        axios.put("/appointments/reminders", obj).then(function(data) {
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
          .delete("/appointments/reminders/" + obj.reminderId)
          .then(function(data) {
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
        userId: this.state.userId
      };
      if (this.state.sendReminder) {
        eventObj.alertTime = this.state.alertTime;
      }

      this.setState({
        modal: !this.state.modal
      });
      console.log(eventObj);

      axios.post("/reminder", eventObj).then(data => {
        //updates array of events in state to update the page display
        // this.setState({events: [...this.state.events, data.data]})

        if (this.state.sendReminder) {
          let eventDate = moment(this.state.date).format("YYYY-MM-DD HH:mm");
          let obj = {
            date: eventDate,
            notification: this.state.alertTime,
            message: `You have an upcoming event: ${this.state.item} on ${moment(
              eventDate
            ).format("MMMM D")} at ${moment(eventDate).format("HH:mm")}`,
            userId: this.state.userId,
            type: "reminder",
            reminderId: data.data.id
          };
          axios.post("/appointment", obj).then(function(data) {
            console.log(data);
          });

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
                message: "You will be receiving event reminders to this number. Text STOP to unsubscribe.",
                type: "initial text",
                userId: this.state.userId
              };
              axios.post("/appointment", newObj).then(function(data) {
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

  deleteEvent = id => {
    axios.delete("/appointments/reminders/" + id)
      .then((data) => {
        // console.log(data);
        axios.delete("/reminders/" + id).then(data => {
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
      alertTime: 0
    });
  };

  render() {
    //************buttons and onClick functions on the modal, depending on which button was clicked (create or edit event)
    let modalDisplay;
    if (this.state.modal && this.state.currentModal === "create") {
      modalDisplay = (
        <ModalFooter>
          <Button color="primary" onClick={this.saveEvent}>
            Save
          </Button>
        </ModalFooter>
      );
    } else if (this.state.modal && this.state.currentModal === "edit") {
      modalDisplay = (
        <ModalFooter>
          <Button color="primary" onClick={this.saveEventChanges}>
            Save Changes
          </Button>
        </ModalFooter>
      );
    }

    //******** dropdown menu display if user chooses to send alerts
    let alertOpts;
    if (this.state.sendReminder) {
      alertOpts = (
        <FormGroup>
          <Input
            type="select"
            name="select"
            className="select-dropdown"
            onChange={this.handleSelectChange}
          >
            <option
              value="0"
              selected={this.state.alertTime === 0 ? "selected" : ""}
              className="select-dropdown"
            >
              At time of the event
            </option>
            <option
              value="15"
              selected={this.state.alertTime === 15 ? "selected" : ""}
              className="select-dropdown"
            >
              15 mins before event
            </option>
            <option
              value="30"
              selected={this.state.alertTime === 30 ? "selected" : ""}
              className="select-dropdown"
            >
              30 mins before event
            </option>
            <option
              value="60"
              selected={this.state.alertTime === 60 ? "selected" : ""}
              className="select-dropdown"
            >
              1 hour before event
            </option>
            <option
              value="120"
              selected={this.state.alertTime === 120 ? "selected" : ""}
              className="select-dropdown"
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
          <p className="validation">Please fill required(*) fields</p>
        </div>
      );
    } else {
      validation = "";
    }

    //========== request phone number if alert are turned on ========//
    let phoneRequest;
    if (!this.state.phoneNumberSaved && this.state.sendReminder) {
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

    return (
      <div>
        {/* Logout Redirection */}
        {this.props.handleUserRedirect()}

        <Sidebar handleUserLogout={this.props.handleUserLogout} />

        <div 
            className="container">
          <div className="row">
            <Card className="add-event-btn">
            <Button color="warning" onClick={this.createEvent}>
            <i className="fas fa-plus"></i>{" "}Event
            </Button>
            </Card>
          </div>
          <br />
          {/* <div className="row"> */}
            <div id="wrapper">
              {/**************Display of existing events****************/}
              {this.state.events.map((item, index) => {
                return (
                  <Row>
                    <Col>
                      <Card 
                      body
                      className="event-item animated lightSpeedIn">
                        <CardTitle>{item.item}</CardTitle>
                        <hr />
                        <CardText>
                          <p>{item.note}</p>
                          <p>
                            {moment(item.date).format("MMMM D")} at{" "}
                            {moment(item.date.replace(":00.000Z", "").replace("T", " ")).format("hh:mm A")}
                          </p>
                        </CardText>
                        <div>
                          <Button
                            color="primary"
                            onClick={() => this.editEvent(item.id, index)}
                          >
                            <i className="fas fa-edit"></i>
                          </Button>
                          {" "}
                          <Button
                            color="danger"
                            onClick={() => this.deleteEvent(item.id)}
                          >
                            <i className="fas fa-trash-alt"></i>
                          </Button>
                        </div>
                      </Card>
                    </Col>
                  </Row>
                );
              })}
            </div>
            
          {/* </div> */}
        </div>

        <Modal 
            isOpen={this.state.modal} 
            toggle={this.toggle}
            id="modal-position">
          <ModalHeader toggle={this.toggle}>Create Event</ModalHeader>
          <ModalBody className="modal-body">
            <Form
                className="modal-form">
              <FormGroup>
                <Label for="item">Title*</Label>
                <Input
                  type="text"
                  id="item"
                  value={this.state.item}
                  onChange={this.handleSubjectChange}
                />
              </FormGroup>
              <FormGroup>
                <Label for="notes">Description</Label>
                <Input
                  type="textarea"
                  id="notes"
                  value={this.state.note}
                  onChange={this.handleNoteChange}
                />
              </FormGroup>
              <p>Date & Time (PST)</p>
              <DateTimePicker
                className="date-format"
                maxDetail="minute"
                onChange={this.handleDateChange}
                value={this.state.date}
              />
              <Row className="alert-format">
                <Col>
                  Send Alert
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
            {validation}
          </ModalBody>
          {modalDisplay}
        </Modal>
      </div>
    );
  }
}

export default Reminder;
