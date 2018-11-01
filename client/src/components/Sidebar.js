import React from "react";

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
                <a href="/">Home</a>
              </li>
              <li>
                <a href="/profile">Profile</a>
              </li>
              <li className="active">
                <a
                  href="#flashcards-submenu"
                  data-toggle="collapse"
                  aria-expanded="false"
                  className="dropdown-toggle"
                >
                  Flashcards
                </a>
                <ul className="collapse list-unstyled" id="flashcards-submenu">
                  <li>
                    <a href="/decks">Decks</a>
                  </li>
                  <li>
                    <a href="">Cards</a>
                  </li>
                </ul>
              </li>
              <li>
                <a href="">Notes</a>
              </li>
              <li>
                <a href="/reminder">Reminders</a>
              </li>
              <li>
                <a href="">To-Do</a>
              </li>
              <li>
                <a href="">Pomodoro Timer</a>
              </li>
              <li>
                <a
                  href="#menu-toggle"
                  className="btn"
                  id="menu-toggle"
                  onClick={this.toggle}
                >
                  <i className="far fa-times-circle"></i>
                </a>
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

            <a
              href="#menu-toggle"
              className="btn btn-secondary"
              id="menu-toggle"
              onClick={this.toggle}
            >
              Toggle Menu
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default Sidebar;
