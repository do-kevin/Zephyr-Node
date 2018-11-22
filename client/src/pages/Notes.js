import React from "react";
import ReactQuill from "react-quill";
import {Button} from "reactstrap";
import moment from "moment";
import axios from "axios";
import { HashLink as Link } from "react-router-hash-link";

// Components
import Sidebar from "../components/Sidebar";


// CSS
import "../css/Notes.css";

class Note extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: "",
      note: "",
      notesArr: [],
      userId: JSON.parse(localStorage.getItem("user")).id,
      timeNdate: moment().format("ddd, MMMM Do YYYY, h:mm:ss a")
    };
    this.handleChange = this.handleChange.bind(this);
    // this.saveNote = this.saveNote.bind(this);
  }
  

  modules = {
    toolbar: [
      [{ header: [1, 2, false] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" }
      ],
      ["link", "image", "video", "code-block"],
    ],
    keyboard:   { 
        bindings:   [
            {tab: false}
        ]
    }
  };

  formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
    "video",
    "code-block"
  ];

  handleChange(value) {
    this.setState({ text: value });
  }

  getNotes = () => {
    axios.get(`/notes/users/${this.state.userId}`).then((response) => {
      // console.log(response.data);
      this.setState({
        notesArr: [...response.data]
      })
    })
  }

  createNote = () => {
    // console.log("Creating Note");
    // this.setState({ note: this.state.text });
    axios.post(`/notes/${this.state.userId}`, { note: this.state.text }).then((response) => {
      // console.log(response);
      this.getNotes();
    });
    
  }

  deleteNote = (id) => {
    axios.delete(`/notes/${id}`).then((response) => {
      this.getNotes();
    });
  }

  componentDidMount() {
    this.getNotes();
  }

  render() {
    return (
      <div style={{scrollBehavior: "smooth"}}>
        {/* Logout redirection */}
        {this.props.handleUserRedirect()}
      
        <Sidebar handleUserLogout={this.props.handleUserLogout} />
        <Link smooth to="/notes#save-note-btn">
          <button 
          style={{
            marginLeft: "90%", background: "transparent", 
            border: "none", borderRadius: "50%", 
            outline: "none", cursor: "pointer"}}>
              <i id="slide-away-notes-btn"
              className="fas fa-chevron-circle-down animated slideInDown" 
              ></i>
          </button>
        </Link>
        {this.state.notesArr.map((item, index) => {
          return (
              <div key={item.id} className="animated zoomInRight note-output" style={{ overflowY: "scroll"}}>
                <Button className="delete-note-btn" style={{marginLeft: "94%", borderRadius: "25px 0 25px 0", marginTop: "2px"}} color="danger" type="button" onClick={ () => this.deleteNote(item.id) }><i className="fas fa-trash-alt"></i></Button>
                <div className="quill-output" dangerouslySetInnerHTML={{ __html: item.note}} style={{ wordBreak: "break-word"}}></div> 
              </div>
          );
        })}

        <div id="quill-wrapper" className="text-center animated slideInUp">
          <h1>Notes</h1>
          <p>*To create an <strong>embed link</strong>: Highlight a typed text, click the link button, and save the url</p>
          <ReactQuill
            theme="snow"
            id="quill-input"
            value={this.state.text}
            onChange={this.handleChange}
            modules={this.modules}
            formats={this.formats}
            style={{whiteSpace: "normal !important"}}
          />
        <Button id="save-note-btn" color="primary" onClick={this.createNote} style={{ margin : "70px 0 30px 0" }}><i className="fas fa-pen-alt"></i></Button>
        </div>
      </div>
    );
  }
}

export default Note;
