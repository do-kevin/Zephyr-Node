import React from "react";
import moment from "moment-timezone";
import axios from "axios";

import Sidebar from "../components/Sidebar";
import {
  Button,
  Form,
  FormGroup,
  Label,
  Input
} from "reactstrap";

class Setting extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            date: new Date(),
            phoneNumberSaved: false,
            phone: "",
            currentPhone: "",
            username: '',
            userId: null,
            saved: false
        };
      }
    
    componentDidMount() {
        console.log("start")
        try {
          const userId = JSON.parse(localStorage.getItem("user")).id,
            redirect = !userId;
          if (userId) {
            this.setState(() => ({userId, redirect}), 
            () => {
              this.getUserInfo();
            });
          }
        } catch (err) {
          console.log(err);
        }
    }

    getUserInfo = () => {
      axios.get("/user/" + this.state.userId).then(data => {
        console.log(data)
        if (data.data[0].phoneNumber !== null) {
          this.setState({
            phoneNumberSaved: true,
            phone: data.data[0].phoneNumber,
            currentPhone: data.data[0].phoneNumber
          });
        }
        this.setState({
            username: data.data[0].username,
        })
      });
    };

  handlePhoneChange = event => {
    console.log(event.target.value.replace(/\D/g, ''))
    this.setState({
      currentPhone: event.target.value
    });
  };

  //saves any edits done to the selected event
  saveChanges = () => {
    if (this.state.phone !== this.state.currentPhone) {

      let phoneObj = {
        phoneNumber: this.state.currentPhone.replace(/\D/g, "")
      };
      axios.put("/users/" + this.state.userId, phoneObj).then(data => {
        let eventDate = moment(Date.now()).add(1, "minutes").format("YYYY-MM-DD HH:mm");
        let newObj = {
          date: eventDate,
          notification: 0,
          message: "You will be receiving text alerts to this number. Text STOP to unsubscribe.",
          type: "initial text",
          userId: this.state.userId
        };
        axios.post("/appointment", newObj).then(function(data) {
          // console.log("phone number set - " + data);
          this.setState({
              saved: true
          })
        });
      });
    }
}


  render() {
    let notification;
    if (this.state.saved) {
        notification = <div><p style={{color: "red", marginTop: "30px"}}>Changes have been saved</p></div>
    }

    return (
      <div>
        {/* Logout Redirection */}
        {this.props.handleUserRedirect()}

        <Sidebar handleUserLogout={this.props.handleUserLogout} />

        <div className="container">
        <div className="row">
        <div className="col-md-4"></div>
        <div className="col-md-4">
        <Form
                className="modal-form">
              <FormGroup>
                <Label for="username">Username:</Label>
                <Input
                  type="text"
                  id="username"
                  value={this.state.username}
                  disabled
                //   onChange={this.handleSubjectChange}
                />
              </FormGroup>
              <FormGroup>
                <Label for="phone">Phone number:</Label>
                <Input
                  type="text"
                  id="phone"
                  value={this.state.currentPhone}
                  onChange={this.handlePhoneChange}
                  placeholder={this.state.currentPhone}
                />
                <p style={{fontSize: "12px"}}>*Leave blank and click <em style={{color: "grey"}}>Save</em> to remove your phone number</p>
              </FormGroup>
                <Button color="primary" onClick={this.saveChanges}>
                    Save Changes
                </Button>
            </Form>
            {notification}
            </div>
            <div className="col-md-4"></div>
            </div>
        </div>
      </div>
    );
  }
}

export default Setting;
