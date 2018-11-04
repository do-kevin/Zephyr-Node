import React from "react";
import ReactQuill from "react-quill";
import moment from "moment";

// Components
import Sidebar from "../components/Sidebar";

// CSS
import "../css/Notes.css";

class Note extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      note: "",
      time_date: moment().format("ddd, MMMM Do YYYY, h:mm:ss a")
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(value) {
    this.setState({ note: value });
  }

  render() {
    return (
      <div>
        <Sidebar />
        <h1>Notes</h1>
        <p>{this.state.time_date}</p>
        <ReactQuill value={this.state.note} onChange={this.handleChange} />
      </div>
    );
  }
}

export default Note;
