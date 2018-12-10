import React from "react";
import { Link } from "react-router-dom";

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
              {/* <li className="sidebar-brand sidebar-nav-item">
                <Link to="/">Home</Link>
              </li> */}
              <li 
                className="sidebar-brand sidebar-nav-item"
                id="profile-span"
              >
                <Link to="/profile">
                <span 
                  className="sidebar-nav-span"
                  style={{fontSize: "20px"}}
                  >Profile</span></Link>
              </li>
              <li className="sidebar-nav-item">
                <Link to="/choose"><span className="sidebar-nav-span">Decks</span></Link>
              </li>
              <li className="sidebar-nav-item">
                <Link to="/notes"><span className="sidebar-nav-span">Notes</span></Link>
              </li>
              <li className="sidebar-nav-item">
                <Link to="/reminder"><span className="sidebar-nav-span">Reminders</span></Link>
              </li>
              <li className="sidebar-nav-item">
                <Link to="/todo"><span className="sidebar-nav-span">To-Do</span></Link>
              </li>
              <li
                style={{marginTop: "30%"}}
                className="sidebar-nav-item"
                id="settings-span">
                <Link to="/settings">
                <span 
                  className="sidebar-nav-span"
                  style={{fontSize: "18px"}}
                >Settings</span></Link>
              </li>
              <li>
                <button 
                  className="btn log-out-btn"
                  type="button"
                  onClick={this.props.handleUserLogout}
                  style={{marginLeft: "22%", marginTop: "40%"}}
                >
                  <i className="fas fa-sign-out-alt"></i>{" "}Log Out 
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