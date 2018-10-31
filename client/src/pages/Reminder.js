import React from "react";
import Sidebar from "../components/Sidebar";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input, FormText} 
    from 'reactstrap';
import DateTimePicker from 'react-datetime-picker'
import "../css/Reminder.css";
import moment from "moment";


class Reminder extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            item: "",
            note: "",
            date: new Date(),
            modal: false,
            checkbox: false,
            alert: 0
        };
    
        this.toggle = this.toggle.bind(this);
      }
    
    toggle() {
        this.setState({
          modal: !this.state.modal
        });
    }

    handleSubjectChange = (event) => {
        // console.log(event.target.value)
        this.setState({
            item: event.target.value
        })
    }
     
    handleDateChange = (date) => {
        console.log(date)
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
            checkbox: event.target.checked
        }) 
        console.log(event.target.checked)
    }

    selectChange = event => {
        this.setState({
            alert: event.target.value
        })
        // console.log(event.target.value)
    }

    saveEvent = () => {
        this.setState({
            modal: !this.state.modal
          });
        //*********************NEED USER ID****************
        let eventObj = {
            item: this.state.item,
            note: this.state.note,
            date: moment(this.state.date).format("YYYY-MM-DD HH:mm")
        }
        if(this.state.alert) {
            eventObj.sendAlert = 1;
        }
        else {
            eventObj.sendAlert = 0;
        }
        console.log(eventObj)

    }


    render() {
        let alertOpts;
        if(this.state.checkbox) {
            alertOpts = 
                <FormGroup>
                    {/* <Label for="exampleSelect">Select</Label> */}
                    <Input type="select" name="select" id="exampleSelect"
                    onChange={this.selectChange}>
                        <option value="0">At time of the event</option>
                        <option value="15">15 mins before event</option>
                        <option value="30">30 mins before event</option>
                        <option value="60">1 hour before event</option>
                        <option value="120">2 hours before event</option>
                    </Input>
                </FormGroup>
        }
        else {
            alertOpts = "";
        }

        return (
            <div>
                <Sidebar/>

                <div className="container">
                    <Button color="info" onClick={this.toggle}>Add Event</Button>
                </div>
                    
                    <Modal isOpen={this.state.modal} toggle={this.toggle}>
                    <ModalHeader toggle={this.toggle}>Modal title</ModalHeader>
                    <ModalBody className="modal-body">
                        <Form>
                            <FormGroup>
                                <Label for="subject">Title</Label>
                                <Input type="text" id="subject" value={this.state.item} onChange={this.handleSubjectChange}/>
                            </FormGroup>
                            <FormGroup>
                                <Label for="notes">Notes</Label>
                                <Input type="textarea" id="notes" value={this.state.note} onChange={this.handleNoteChange}/>
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
                                <Input type="checkbox"  onChange={this.checkboxChange}/>{' '}
                                    Send Alert
                                </Label>
                            </FormGroup>
                            {alertOpts}
                        </Form>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={this.saveEvent}>Save</Button>{' '}
                        <Button color="secondary" onClick={this.toggle}>Cancel</Button>
                    </ModalFooter>
                    </Modal>
            </div>
        )
    }
};

export default Reminder;