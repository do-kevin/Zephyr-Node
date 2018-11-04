import React from "react";
import ReactQuill, { Quill } from "react-quill";
import axios from "axios";

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
      userId: JSON.parse(localStorage.getItem("user")).id
    };
    this.handleChange = this.handleChange.bind(this);
    this.saveNote = this.saveNote.bind(this);
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

  saveNote = event => {
    event.preventDefault();

    this.setState({ note: this.state.text });
  };

  componentDidMount() {
  }

  render() {
    return (
      <div>
        <Sidebar />
        <h1>Notes</h1>
        <p>Create an <strong>embed link</strong>: Type it, highlight it, and then click on the link button</p>
        <ReactQuill
          theme="snow"
          value={this.state.text}
          onChange={this.handleChange}
          modules={this.modules}
          formats={this.formats}
        />
        <button onClick={this.saveNote}>Show Note on Click</button>
        {<div dangerouslySetInnerHTML={{ __html: this.state.note }} style={{ wordBreak: "break-word"}}/>}
      </div>
    );
  }
}

export default Note;
