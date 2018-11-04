import React from "react";
import ReactQuill from "react-quill";
import axios from "axios";

// Components
import Sidebar from "../components/Sidebar";

// CSS
import "../css/Notes.css";

class Note extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      note: "",
      userId: JSON.parse(localStorage.getItem("user")).id
    };
    this.handleChange = this.handleChange.bind(this);
  }

  modules = {
    toolbar: [
      [{ 'header': [1, 2, false] }],
      ['bold', 'italic', 'underline','strike', 'blockquote'],
      [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
      ['link', 'image'],
      ['clean']
    ],
  }

  formats = [
    'header',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent',
    'link', 'image'
  ]

  handleChange(value) {
    this.setState({ note: value });
  }

  componentDidMount() {

  }

  render() {
    if (this.state.note !== null) {
        console.log(this.state.note)
    }

    return (
      <div>
        <Sidebar />
        <h1>Notes</h1>
        <ReactQuill value={this.state.note} onChange={this.handleChange} modules={this.modules}
                    formats={this.formats}/>

        <div dangerouslySetInnerHTML={{__html: this.state.note}}></div>
      </div>
    );
  }
}

export default Note;
