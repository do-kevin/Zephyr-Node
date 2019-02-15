import React from "react";
import ReactQuill from "react-quill";
import {Button} from "reactstrap";
import moment from "moment";
import axios from "axios";
import { HashLink as Link } from "react-router-hash-link";
import DOMPurify from "dompurify";
import styled from 'styled-components';

import Sidebar from "../components/Sidebar";

import "../css/Notes.scss";

const Menu = styled.menu`
  #sidebar {
    top: 0;
  }
  .sidebar-nav__link--notes {
    background: hsl(211, 100%, 97%);;
    box-shadow: 0px 2px 1px #888, 0px -2px 1px #888;
  }
  .sidebar-nav__link--notes .sidebar-nav__text {
    color: black;
  }
`;

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
    ]
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
    this.setState({ text: (DOMPurify.sanitize(value)) });
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
    document.querySelector(".ql-bold").setAttribute("data-balloon", "Bold");
    document.querySelector(".ql-bold").setAttribute("data-balloon-pos", "down");
    document.querySelector(".ql-italic").setAttribute("data-balloon", "Italicize");
    document.querySelector(".ql-italic").setAttribute("data-balloon-pos", "down");
    document.querySelector(".ql-underline").setAttribute("data-balloon", "Underline");
    document.querySelector(".ql-underline").setAttribute("data-balloon-pos", "down");
    document.querySelector(".ql-strike").setAttribute("data-balloon", "Strikethrough");
    document.querySelector(".ql-strike").setAttribute("data-balloon-pos", "down");
    document.querySelector(".ql-blockquote").setAttribute("data-balloon", "Block quote");
    document.querySelector(".ql-blockquote").setAttribute("data-balloon-pos", "down");
    document.querySelectorAll(".ql-list")[0].setAttribute("data-balloon", "Ordered list");
    document.querySelectorAll(".ql-list")[0].setAttribute("data-balloon-pos", "down");
    document.querySelectorAll(".ql-list")[1].setAttribute("data-balloon", "Bulleted list");
    document.querySelectorAll(".ql-list")[1].setAttribute("data-balloon-pos", "down");
    document.querySelectorAll(".ql-indent")[0].setAttribute("data-balloon", "Indent left");
    document.querySelectorAll(".ql-indent")[0].setAttribute("data-balloon-pos", "down");
    document.querySelectorAll(".ql-indent")[1].setAttribute("data-balloon", "Indent right");
    document.querySelectorAll(".ql-indent")[1].setAttribute("data-balloon-pos", "down");
    document.querySelector(".ql-link").setAttribute("data-balloon", "Embed URL link");
    document.querySelector(".ql-link").setAttribute("data-balloon-pos", "down");
    document.querySelector(".ql-image").setAttribute("data-balloon", "Insert image");
    document.querySelector(".ql-image").setAttribute("data-balloon-pos", "down");
    document.querySelector(".ql-video").setAttribute("data-balloon", "Insert video URL");
    document.querySelector(".ql-video").setAttribute("data-balloon-pos", "down");
    document.querySelector(".ql-code-block").setAttribute("data-balloon", "Code block");
    document.querySelector(".ql-code-block").setAttribute("data-balloon-pos", "down");
  }

  render() {
    return (
      <div style={{scrollBehavior: "smooth"}}>
        {/* Logout redirection */}
        {this.props.handleUserRedirect()}
      
        <Menu><Sidebar handleUserLogout={this.props.handleUserLogout} /></Menu>
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
          <ReactQuill
            theme="snow"
            id="quill-input"
            value={this.state.text}
            onChange={this.handleChange}
            modules={this.modules}
            formats={this.formats}
            style={{whiteSpace: "normal !important"}}
          />
        <Button id="save-note-btn" color="primary" onClick={this.createNote} style={{ margin : "70px 0 30px 0" }}>
          Save{" "}<i className="fas fa-pen-alt"></i>
        </Button>
        </div>
      </div>
    );
  }
}

export default Note;
