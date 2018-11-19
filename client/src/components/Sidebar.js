import React from "react";
import {Link, Route} from "react-router-dom";

// CSS
import "../css/Sidebar.css";

class Sidebar extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: true
    };
  };

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  };
  
  render() {
    let showMenu;

    if (this.state.isOpen) {
      showMenu = (
        <div id="wrapper" className="toggled">
          <div id="sidebar-wrapper">
            <ul className="sidebar-nav">
              <li className="sidebar-brand">
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/profile">Profile</Link>
              </li>
              <li>
                <Link to="/choose">Decks</Link>
              </li>
              <li>
                <Link to="/notes">Notes</Link>
              </li>
              <li>
                <Link to="/reminder">Reminders</Link>
              </li>
              <li>
                <Link to="/todo">To-Do</Link>
              </li>
              <li
                style={{marginTop: "30%"}}>
                <Link to="/settings">Settings</Link>
              </li>
              <li>
                <button 
                  className="btn"
                  type="button"
                  onClick={this.props.handleUserLogout}
                  style={{marginLeft: "22%", marginTop: "40%"}}
                >
                  <i className="fas fa-sign-out-alt"></i>{" "}Logout 
                </button>
              </li>
            </ul>
          </div>
        </div>
      );
      document.body.style.marginLeft = "250px";
    } else {
      document.body.style.marginLeft = "0px";
    }

    return (
      <div>
        {showMenu}
        <div id="page-content-wrapper">
          <div className="container-fluid">
            {/* Where we would insert our pages */}

            <Link
              to="#menu-toggle"
              className="btn btn-secondary"
              id="menu-toggle"
              onClick={this.toggle}
            >
              <i className="fas fa-bars"></i>
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

export default Sidebar;
