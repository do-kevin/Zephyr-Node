import React from "react";
import { Row, Col, Card, Button } from "reactstrap";

// Components
import Sidebar from "../components/Sidebar";
import Search from "../components/Search";

// CSS
import "../css/ChooseDeck.css";

class ChooseDeck extends React.Component {
  render() {
    return (
      <div>
        <Sidebar />
        <Search />
        <div id="deck-list">
        <div className="row">
            <Card className="add-event-btn">
            <Button color="warning" onClick={this.createEvent}>
            <i className="fas fa-plus"></i>{" "}Deck
            </Button>
            </Card>
          </div>
          <Row>
            <Col>
              <div className="decks decks-primary animated bounceIn">
                <h1>Deck Name</h1>
                <hr />
                <div className="tags-box">
                  <p>
                    #test #test1 #test2 #test3 #test4 #test5 #test #test1 #test2
                    #test3 #test4 #test5
                  </p>
                </div>
              </div>
            </Col>
            <Col>
              <div className="decks decks-primary animated bounceIn">
                <h1>Deck Name</h1>
                <hr />
                <div className="tags-box">
                  <p>
                    #test #test1 #test2 #test3 #test4 #test5 #test #test1 #test2
                    #test3 #test4 #test5
                  </p>
                </div>
              </div>
            </Col>
            <Col>
              <div className="decks decks-primary animated bounceIn">
                <h1>Deck Name</h1>
                <hr />
                <div className="tags-box">
                  <p>
                    #test #test1 #test2 #test3 #test4 #test5 #test #test1 #test2
                    #test3 #test4 #test5
                  </p>
                </div>
              </div>
            </Col>
          </Row>
          <Row>
            <Col>
              <div className="decks decks-primary animated bounceIn">
                <h1>Deck Name</h1>
                <hr />
                <div className="tags-box">
                  <p>
                    #test #test1 #test2 #test3 #test4 #test5 #test #test1 #test2
                    #test3 #test4 #test5
                  </p>
                </div>
              </div>
            </Col>
            <Col>
              <div className="decks decks-primary animated bounceIn">
                <h1>Deck Name</h1>
                <hr />
                <div className="tags-box">
                  <p>
                    #test #test1 #test2 #test3 #test4 #test5 #test #test1 #test2
                    #test3 #test4 #test5
                  </p>
                </div>
              </div>
            </Col>
            <Col>
              <div className="decks decks-primary animated bounceIn">
                <h1>Deck Name</h1>
                <hr />
                <div className="tags-box">
                  <p>
                    #test #test1 #test2 #test3 #test4 #test5 #test #test1 #test2
                    #test3 #test4 #test5
                  </p>
                </div>
              </div>
            </Col>
          </Row>
          <Row>
            <Col>
              <div className="decks decks-primary animated bounceIn">
                <h1>Deck Name</h1>
                <hr />
                <div className="tags-box">
                  <p>
                    #test #test1 #test2 #test3 #test4 #test5 #test #test1 #test2
                    #test3 #test4 #test5
                  </p>
                </div>
              </div>
            </Col>
            <Col>
              <div className="decks decks-primary animated bounceIn">
                <h1>Deck Name</h1>
                <hr />
                <div className="tags-box">
                  <p>
                    #test #test1 #test2 #test3 #test4 #test5 #test #test1 #test2
                    #test3 #test4 #test5
                  </p>
                </div>
              </div>
            </Col>
            <Col>
              <div className="decks decks-primary animated bounceIn">
                <h1>Deck Name</h1>
                <hr />
                <div className="tags-box">
                  <p>
                    #test #test1 #test2 #test3 #test4 #test5 #test #test1 #test2
                    #test3 #test4 #test5
                  </p>
                </div>
              </div>
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}

export default ChooseDeck;
