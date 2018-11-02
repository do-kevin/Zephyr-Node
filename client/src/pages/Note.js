import React from "react";
import {
    Card, CardBody, CardTitle, CardText, Button, ListGroup, ListGroupItem, Modal, ModalHeader, ModalBody, Form, Input
} from 'reactstrap';
import axios from "axios";
import moment from "moment";

// Components
import TimeDate from "../components/TimeDate";
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
            validationClass: "novalidation"
        };
    }

    render () {
        return (
            <div>
                <Sidebar />
                <h1>Notes</h1>
                <p><TimeDate /></p>
            </div>
        )
    }
}

export default Note;