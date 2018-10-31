import React from "react";
import moment from "moment";
import axios from "axios";

import Sidebar from "../components/Sidebar";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input, Card, CardTitle, CardText} 
    from 'reactstrap';
import DateTimePicker from 'react-datetime-picker'
import "../css/Reminder.css";


class Reminder extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            item: "",
            note: "",
            date: new Date(),
            modal: false,
            sendReminder: false,
            alertTime: 0,
            saveClicked: false,
            events: [],
            currentModal: "", 
            editingObj: {}
        };
    
        this.toggle = this.toggle.bind(this);
      }
    
    componentDidMount() {
        console.log("start")
        this.getReminders();
    }
    
    getReminders = () => {
        //get userId
        axios.get("/reminders/1")
            .then (data => {
                console.log(data.data);
                this.setState({
                    events: data.data
                })
            }
        )
    }
    
    toggle() {
        this.setState({
            modal: !this.state.modal
        });
        this.clearModal();
    }

    createEvent = () => {
        this.setState({currentModal: "create"});
        this.toggle();
    }
    
    editEvent = (id, index) => {
        console.log(id);
        this.setState({currentModal: "edit"});
        this.toggle();

        let obj = {...this.state.events[index]};
        this.setState({
            item: obj.item,
            note: obj.note,
            date: new Date(obj.date),
            sendReminder: obj.sendAlert,
            editingObj: obj
        })
        if(obj.sendAlert) {
            this.setState({alertTime: obj.alertTime})
        }
    }


    handleSubjectChange = (event) => {
        // console.log(event.target.value)
        this.setState({
            item: event.target.value
        })
    }
     
    handleDateChange = (date) => {
        console.log(date);
        this.setState({date})
    };

    handleNoteChange = (event) => {
        // console.log(event.target.value)
        this.setState({
            note: event.target.value
        })
    }

    checkboxChange = event => {
        this.setState({
            sendReminder: event.target.checked
        }) 
        console.log(event.target.checked)
    }

    handleSelectChange = event => {
        this.setState({
            alertTime: event.target.value
        })
        // console.log(event.target.value)
    }

    //saves any edits done to the selected event
    saveEventChanges = () => {
        let eventObj = {
            id: this.state.editingObj.id,
            item: this.state.item,
            note: this.state.note,
            date: moment(this.state.date).format("YYYY-MM-DD HH:mm"),
            sendAlert: this.state.sendReminder,
            userId: 1  //*************replace with current user id*****************/
        }
        if(this.state.sendReminder) {
            eventObj.alertTime = this.state.alertTime
        }
        else {
            eventObj.alertTime = null
        }

        this.setState({
            modal: !this.state.modal
        });

        axios.put("/reminders", eventObj)
            .then(data => {
                console.log(data);
                let eventDate = moment(eventObj.date).format("YYYY-MM-DD HH:mm")
                let obj = {
                    date: eventDate,
                    notification: eventObj.alertTime,
                    message: `Upcoming event: ${eventObj.item} on ${moment(eventDate).format('MMMM D')} at ${moment(eventDate).format('HH:mm')}`,
                    userId: 1,
                    type: "reminder",
                    reminderId: eventObj.id
                }

                //if event was changed to send to an alert, create a new appointment
                if (this.state.editingObj.sendAlert === false && eventObj.sendAlert === true) {
                    console.log("create appt")

                    axios.post("/appointment", obj)
                        .then(function (data) {
                            console.log(data);
                    })
                }
                //if existing appointment's date and/or alert time were edited, update appointment
                else if ((this.state.editingObj.sendAlert && eventObj.sendAlert) &&
                        (this.state.editingObj.alertTime !== eventObj.alertTime ||
                        this.state.editingObj.date !== eventObj.date)) {
                    console.log("update appt")
                    axios.put("/appointments/reminders", obj)
                        .then(function (data) {
                            console.log(data);
                        })
                }
                //if existing alert was turned off, delete existing appointment
                else if (this.state.editingObj.sendAlert === true && eventObj.sendAlert === false) {
                    console.log("delete appt")
                    console.log(obj.reminderId)
                    axios.delete("/appointments/reminders/" + obj.reminderId)
                        .then(function (data) {
                            console.log(data);
                        })
                }
                this.getReminders();
            })
    }

    //saves new event
    saveEvent = () => {
        if(this.state.item !== "") {
            //*********************NEED USER ID****************
            let eventObj = {
                item: this.state.item,
                note: this.state.note,
                date: moment(this.state.date).format("YYYY-MM-DD HH:mm"),
                sendAlert: this.state.sendReminder,
                userId: 1  //*************replace with current user id*****************/
            }
            if(this.state.sendReminder) {
                eventObj.alertTime = this.state.alertTime
            }

            this.setState({
                modal: !this.state.modal
            });
            console.log(eventObj)

            
            axios.post("/reminder", eventObj)
            .then(data => {
                    //updates array of events in state to update the page display
                    // this.setState({events: [...this.state.events, data.data]})

                    if(this.state.sendReminder) {
                        let eventDate = moment(this.state.date).format("YYYY-MM-DD HH:mm")
                        let obj = {
                            date: eventDate,    
                            notification: this.state.alertTime,
                            message: `Upcoming event: ${this.state.item} on ${moment(eventDate).format('MMMM D')} at ${moment(eventDate).format('HH:mm')}`,
                            userId: 1,
                            type: "reminder",
                            reminderId: data.data.id
                        }
                        axios.post("/appointment", obj)
                            .then(function(data) {
                                console.log(data);
                            })
                    }

                this.getReminders();
                }
            )
        }
        else {
            this.setState({saveClicked: true})
        }
    }
    
    deleteEvent = (id) => {
        axios.delete("/reminders/" + id)
        .then(data => {
            console.log(data);
            this.getReminders();
        })
    }

    //resets all states settings on the modal whenever it's opened or closed
    clearModal = () =>
    {
        this.setState({
            item: "",
            note: "",
            date: new Date(),
            checkbox: false,
            alert: 0,
            saveClicked: false,
            sendReminder: false,
            alertTime: 0,
        })
    }


    render() {
        //************buttons and onClick functions on the modal, depending on which button was clicked (create or edit event)
        let modalDisplay;
        if (this.state.modal && this.state.currentModal === "create") {
            modalDisplay =
                <ModalFooter>
                    <Button color="primary" onClick={this.saveEvent}>Save</Button>{' '}
                    <Button color="secondary" onClick={this.toggle}>Cancel</Button>
                </ModalFooter>

        } 
        else if (this.state.modal && this.state.currentModal === "edit") {
            modalDisplay =
            <ModalFooter>
            <Button color="primary" onClick={this.saveEventChanges}>Save Changes</Button>{' '}
            <Button color="secondary" onClick={this.toggle}>Cancel</Button>
            </ModalFooter>
        } 
        // else if (this.state.modal && this.state.currentModal === "delete") { 
        //     modalDisplay =
        //     <ModalFooter>
        //     <Button color="danger" onClick={this.saveEvent}>Delete</Button>{' '}
        //     <Button color="secondary" onClick={this.toggle}>Cancel</Button>
        //     </ModalFooter>
        // }

        //******** dropdown menu display if user chooses to send alerts
        let alertOpts;
        if(this.state.sendReminder) {
            alertOpts = 
                <FormGroup>
                    <Input type="select" name="select" id="exampleSelect"
                    onChange={this.handleSelectChange}>
                        <option value="0" selected={this.state.alertTime === 0 ? "selected" : ""}>At time of the event</option>
                        <option value="15" selected={this.state.alertTime === 15 ? "selected" : ""}>15 mins before event</option>
                        <option value="30" selected={this.state.alertTime === 30 ? "selected" : ""}>30 mins before event</option>
                        <option value="60" selected={this.state.alertTime === 60 ? "selected" : ""}>1 hour before event</option>
                        <option value="120" selected={this.state.alertTime === 120 ? "selected" : ""}>2 hours before event</option>
                    </Input>
                </FormGroup>
        }
        else {
            alertOpts = "";
        }

        //******** validation text if title is not filled out on modal
        let validation;
        if(this.state.item === "" && this.state.saveClicked) {
            validation = 
            <div>
                <p className="validation">Please fill required(*) fields</p>
            </div>
        }
        else {
            validation = "";
        }

        return (
            <div>
                <Sidebar/>

                <div className="container">
                    <div className="row">
                        <Button color="info" onClick={this.createEvent}>Add Event</Button>
                    </div>
                    <div className="row">
                        <div>
                            {/**************Display of existing events****************/}
                            {this.state.events.map((item, index) => {
                                return (
                                    <Card body>
                                        <CardTitle>{item.item}</CardTitle>
                                        <CardText>
                                            <p>{item.note}</p>
                                            <p>{moment(item.date).format('MMMM D')} at {moment(item.date).format('HH:mm')}</p>
                                        </CardText>
                                        <div>
                                            <Button color="info" onClick={() => this.editEvent(item.id, index)}>Edit</Button>
                                            <Button color="danger" onClick={() => this.deleteEvent(item.id)}>Delete</Button> {' '}
                                        </div>
                                    </Card>
                                )
                            })} 
                        </div>
                    </div>
                </div>
                    
                <Modal isOpen={this.state.modal} toggle={this.toggle}>
                    <ModalHeader toggle={this.toggle}>Modal title</ModalHeader>
                    <ModalBody className="modal-body">
                        <Form>
                            <FormGroup>
                                <Label for="item">Title*</Label>
                                <Input type="text" id="item" value={this.state.item} onChange={this.handleSubjectChange} />
                            </FormGroup>
                            <FormGroup>
                                <Label for="notes">Notes</Label>
                                <Input type="textarea" id="notes" value={this.state.note} onChange={this.handleNoteChange} />
                            </FormGroup>
                            <p>Date & Time</p>
                            <DateTimePicker
                                className="date-format"
                                maxDetail="minute"
                                onChange={this.handleDateChange}
                                value={this.state.date}
                            />
                            <FormGroup check>
                                <Label check className="checkbox-format">
                                    <Input type="checkbox" onChange={this.checkboxChange} checked={this.state.sendReminder ? "checked" : ""}/>{' '}
                                    Send Alert
                                </Label>
                            </FormGroup>
                        </Form>
                        {alertOpts}
                        {validation}
                    </ModalBody>
                    {modalDisplay}
                </Modal>
            </div>
        )
    }
};

export default Reminder;