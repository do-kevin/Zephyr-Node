import React from "react";
import {Redirect} from "react-router-dom";

// Components
import Search from "../components/Search";
import Login from "../components/Login";

// CSS
import "../css/Home.css";

class Home extends React.Component {
  render() {
    return (
      <div>
        {this.props.user && <Redirect to="/profile" />}
        <nav className="navbar justify-content-between">
        <h1>App Name</h1>
          <Login handleUserLogin={this.props.handleUserLogin} />
        </nav>
        <div className="jumbotron banner-image animated fadeIn">
          <div className="banner-text">
            <h1>Wholesome and Inspirational Quote</h1>
            <p>Current date and time or quotist</p>
            <br />
            <Search />
          </div>
        </div>
        <h1 className="text-center display-3">Features</h1>
        <div className="container text-center">
          <div className="row">
            <div className="col">
              <div className="card animated slideInLeft">
                <div className="card-body feature-cards">
                  <h1>
                    <i className="fas fa-layer-group" />
                  </h1>
                  <h5 className="card-title">Flashcards</h5>
                  <p className="card-text text-left">
                    Etiam sapien lectus, pulvinar fringilla lorem ut, imperdiet
                    vehicula ipsum. Curabitur sagittis dolor augue, at tempus
                    massa accumsan a. Nulla sed velit at orci interdum mollis.
                    Fusce faucibus sapien leo, in pellentesque purus molestie
                    ultricies. Suspendisse a sem ac libero facilisis tempus.
                  </p>
                </div>
              </div>
            </div>
            <div className="col">
              <div className="card animated zoomIn">
                <div className="card-body feature-cards">
                  <h1>
                    <i className="fas fa-feather" />
                  </h1>
                  <h5 className="card-title">Notes</h5>
                  <p className="card-text text-left">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam
                    in sapien congue, varius turpis at, tincidunt odio. Maecenas
                    tincidunt magna et volutpat fringilla. Integer pretium
                    cursus dignissim. Fusce lectus est, vestibulum ut metus et,
                    condimentum scelerisque nisl.
                  </p>
                </div>
              </div>
            </div>
            <div className="col">
              <div className="card animated slideInRight">
                <div className="card-body feature-cards">
                  <h1>
                    <i className="fas fa-list" />
                  </h1>
                  <h5 className="card-title">Lists</h5>
                  <p className="card-text text-left">
                    Morbi accumsan sapien vitae sodales porta. Nulla non nibh
                    eget urna dictum hendrerit. Vivamus mattis velit sed lacus
                    sodales, vel facilisis lectus auctor. Donec porttitor
                    pulvinar libero, et mollis eros congue quis. Vestibulum
                    risus ex, mattis et aliquet quis, viverra eu sem. Curabitur
                    varius tempor mi at egestas.
                  </p>
                </div>
              </div>
              <br />
            </div>
          </div>
          <div className="row">
            <div className="col">
              <br />
              <div className="card animated slideInLeft">
                <div className="card-body feature-cards">
                  <h1>
                    <i className="far fa-calendar-alt" />
                  </h1>
                  <h5 className="card-title">Reminders</h5>
                  <p className="card-text text-left">
                    Aliquam sed tempor justo. Praesent sit amet semper justo. In
                    lobortis ullamcorper tellus varius vulputate. Nulla placerat
                    vestibulum tortor, ut efficitur magna elementum eu. Nam
                    lectus eros, elementum at nulla id, ullamcorper feugiat
                    neque. Nullam eget sem porttitor nulla viverra cursus.
                  </p>
                </div>
              </div>
              <br />
            </div>
            <div className="col">
              <br />
              <div className="card animated slideInUp">
                <div className="card-body feature-cards">
                  <h1>
                    <i className="fas fa-stopwatch" />
                  </h1>
                  <h5 className="card-title">Pomodoro Timer</h5>
                  <p className="card-text text-left">
                    Mauris in leo volutpat, sagittis ex sed, suscipit augue.
                    Suspendisse massa ante, venenatis nec luctus at, vestibulum
                    in felis. Nulla ante diam, pellentesque a nunc nec, varius
                    pharetra nunc. Class aptent taciti sociosqu ad litora
                    torquent per conubia nostra, per inceptos himenaeos.
                    Suspendisse sollicitudin a orci ac mollis. Curabitur
                    vehicula tristique porttitor.
                  </p>
                </div>
              </div>
              <br />
            </div>

            <div className="col">
              <br />
              <div className="card animated slideInRight">
                <div className="card-body feature-cards">
                  <h1>
                    <i className="far fa-comment" />
                  </h1>
                  <h5 className="card-title">SMS</h5>
                  <p className="card-text text-left">
                    Donec id hendrerit eros, sed mollis sem. Etiam felis justo,
                    volutpat tempor lacus quis, placerat interdum tortor.
                    Aliquam in dolor vel nunc hendrerit auctor. Maecenas non
                    ante consectetur, consequat nisi et, euismod risus. Nam id
                    commodo lorem. Cras volutpat nisl sit amet sem laoreet
                    posuere.
                  </p>
                </div>
              </div>
              <br />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
