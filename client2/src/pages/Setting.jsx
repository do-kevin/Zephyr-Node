import React from "react";
import moment from "moment-timezone";
import axios from "axios";
import { Label, Input } from "reactstrap";
import styled from "styled-components";

import Sidebar from "../components/Sidebar.jsx";

import "../css/Settings.scss";

let phoneNumber = "1(858) 264-3579";

const Menu = styled.menu`
  #sidebar {
    top: 0;
  }
  .sidebar-nav__link--settings {
    background: hsla(214, 100%, 96%, 1);
    box-shadow: 0px 2px 1px #888, 0px -2px 1px #888;
    border-left: 5px solid hsla(220, 15%, 23%, 1);
  }
  .sidebar-nav__link--settings .sidebar-nav__text {
    color: black;
  }
`;

class Setting extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      date: new Date(),
      phoneNumberSaved: false,
      phone: "",
      currentPhone: "",
      username: "",
      userId: null,
      saved: false,
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
            this.getUserInfo();
          }
        );
      }
    } catch (err) {
      console.log(err);
    }
  }

  getUserInfo = () => {
    axios.get("/api/user/" + this.state.userId).then((data) => {
      console.log(data);
      if (data.data[0].phoneNumber !== null) {
        this.setState({
          phoneNumberSaved: true,
          phone: data.data[0].phoneNumber,
          currentPhone: data.data[0].phoneNumber,
        });
      }
      this.setState({
        username: data.data[0].username,
      });
    });
  };

  handlePhoneChange = (event) => {
    console.log(event.target.value.replace(/\D/g, ""));
    this.setState({
      currentPhone: event.target.value,
      saved: false,
    });
  };

  //saves any edits done to the selected event
  saveChanges = () => {
    if (
      this.state.phone !== this.state.currentPhone &&
      this.state.currentPhone.replace(/\D/g, "") !== ""
    ) {
      let phoneObj = {
        phoneNumber: this.state.currentPhone.replace(/\D/g, ""),
      };
      axios.put("/api/users/" + this.state.userId, phoneObj).then((data) => {
        let eventDate = moment(Date.now())
          .add(1, "minutes")
          .format("YYYY-MM-DD HH:mm");
        let newObj = {
          date: eventDate,
          notification: 0,
          message:
            "You will be receiving text alerts to this number. Text STOP to unsubscribe.",
          type: "initial text",
          userId: this.state.userId,
        };
        axios.post("/api/appointment", newObj).then((data) => {
          // console.log("phone number set - " + data);
          this.setState({
            saved: true,
          });
        });
      });
    }
  };

  render() {
    let notification;
    if (this.state.saved) {
      notification = (
        <div>
          <p style={{ color: "limeGreen", marginTop: "30px" }}>
            Changes have been saved
          </p>
        </div>
      );
    }

    return (
      <div>
        {this.props.handleUserRedirect()} {/* Logout Redirection */}
        <Menu>
          <Sidebar handleUserLogout={this.props.handleUserLogout} />
        </Menu>
        <h1 className="settings__heading1">Account Settings</h1>
        <main className="settings">
          <form>
            <section className="username settings__username">
              <aside className="username__info">
                <h6 className="settings__heading6">Profile</h6>
                <p>
                  The username you registered for this account; it cannot be
                  changed.
                </p>
              </aside>
              <div className="username__form">
                <Label for="username">Username</Label>
                <Input
                  type="text"
                  style={{
                    background: "hsl(0, 0%, 70%)",
                    cursor: "not-allowed",
                  }}
                  value={this.state.username}
                  disabled
                  //   onChange={this.handleSubjectChange}
                />
              </div>
            </section>
            <hr />
            <section className="phonenumber settings__phonenumber">
              <aside className="phonenumber__info">
                <h6 className="settings__heading6">
                  Saving/Changing Your Phone Number
                </h6>
                <p className="phonenumber__warning">
                  If you do not get a text message after saving your phone
                  number, your number may have previously opted out from the
                  service.
                  <br />
                  <br />
                  Please re-subscribe by sending the text message&nbsp;
                  <span className="phonenumber__info__span">START</span> to{" "}
                  <strong>{phoneNumber}</strong>.
                </p>
              </aside>
              <div className="phonenumber__form">
                <Label for="phone">Phone number</Label>
                <input
                  type="text"
                  className="settings-phonenumber-input"
                  style={{ marginBottom: "10px" }}
                  value={this.state.currentPhone}
                  onChange={this.handlePhoneChange}
                  placeholder="Ex: (555) 555-0100"
                />
                {notification}
                <button
                  className="save-phonenumber-btn"
                  onClick={this.saveChanges}
                >
                  Save your phone number
                </button>
              </div>
            </section>
          </form>
        </main>
      </div>
    );
  }
}

export default Setting;
