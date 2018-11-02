import React from "react";
import {
    Card, CardBody, CardTitle, CardText, Button, ListGroup, ListGroupItem, Modal, ModalHeader, ModalBody, Form, Input
} from 'reactstrap';
import axios from "axios";
import moment from "moment";

// Components
import Sidebar from "../components/Sidebar";

// CSS
import "../css/Note.css";

class Note extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            note: "",
            noteId: 0,
            notes: [],
            validationClass: "novalidation",
            time_date: moment().format("ddd, MMMM Do YYYY, h:mm:ss a")
        };
    }

    render () {
        return (
            <div>
                <Sidebar />
                <h1>Notes</h1>
                <p>{this.state.time_date}</p>
            </div>
        )
    }
}

export default Note;