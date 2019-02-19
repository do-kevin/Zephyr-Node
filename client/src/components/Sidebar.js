import React from "react";
import { Link } from "react-router-dom";

// CSS
import "../css/Sidebar.scss";

class Sidebar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isOpen: true
    };
  };

  toggle = () => {
    this.setState({
      isOpen: !this.state.isOpen
    });
  };
  
  render() {
    let showMenu;

    if (this.state.isOpen) {
      showMenu = (
        <div id="wrapper">
          <div id="sidebar">
            <ul className="sidebar-nav">
              <li className="sidebar-nav__link" style={{height: "100px"}}/>
              <li 
                className="sidebar-nav__brand sidebar-nav__link sidebar-nav__link--profile"
                id="profile-span"
              >
                <Link to="/profile">
                <span 
                  className="sidebar-nav__text"
                  style={{fontSize: "20px"}}
                  >Profile</span></Link>
              </li>
              <li className="sidebar-nav__link sidebar-nav__link--decks">
                <Link to="/decks"><span className="sidebar-nav__text">Decks</span></Link>
              </li>
              <li className="sidebar-nav__link sidebar-nav__link--notes">
                <Link to="/notes"><span className="sidebar-nav__text">Notes</span></Link>
              </li>
              <li className="sidebar-nav__link sidebar-nav__link--reminders">
                <Link to="/reminder"><span className="sidebar-nav__text">Reminders</span></Link>
              </li>
              <li className="sidebar-nav__link sidebar-nav__link--todo">
                <Link to="/todo"><span className="sidebar-nav__text">To-dos</span></Link>
              </li>
              <li
                style={{marginTop: "30%"}}
                className="sidebar-nav__link sidebar-nav__link--settings"
                id="settings-span">
                <Link to="/settings">
                <span 
                  className="sidebar-nav__text"
                  style={{fontSize: "18px"}}
                >Settings</span></Link>
              </li>
              <li>
                <button 
                  className="log-out-btn"
                  type="button"
                  onClick={this.props.handleUserLogout}
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
        <div id="wrapper__content" style={{zIndex: "2"}}>
          <div className="container-fluid">
            {/* Where we would insert our pages */}
            <Link
              to="#menu-toggle"
              className="btn toggle-btn"
              id="menu-toggle"
              onClick={this.toggle}
            >
              {/* <i className="fas fa-bars"></i> */}
              {this.state.isOpen ? <i className="fas fa-times animated fadeIn"/> : <i className="fas fa-bars animated fadeIn"/>}
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

export default Sidebar;