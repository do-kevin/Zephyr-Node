import React from "react";
import {
  Row,
  Col,
  Card,
  Button
} from "reactstrap";

// Components
import Sidebar from "../components/Sidebar";
import Search from "../components/Search";
import DeckModal from "../components/DeckModal";


// CSS
import "../css/ChooseDeck.css";

class ChooseDeck extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      openCreate: false
    };

    this.toggle = this.toggle.bind(this);
  }

  toggle = () => {
    this.setState({
      openCreate: !this.state.openCreate
    })
  }

  render() {

    console.log(this.state.openCreate);



    return (
      <div>
        <Sidebar />
        <Search />
        <div id="deck-list">
          <div className="row">
            <Card className="add-event-btn">
              <Button color="warning" onClick={this.toggle}>
                <i className="fas fa-plus" /> Deck
              </Button>
            </Card>
          </div>

          {/* //=================== Render Decks ==================// */}

          <Row>
            <Col>
              <div className="decks decks-primary animated bounceIn">
              <Button 
                color="danger"
                className="trash-btn"><i className="fas fa-trash-alt"></i></Button>
                <h1 className="deck-title">Deck Name</h1>
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
              <Button 
                color="danger"
                className="trash-btn"><i className="fas fa-trash-alt"></i></Button>
                <h1 className="deck-title">Deck Name</h1>
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
              <Button 
                color="danger"
                className="trash-btn"><i className="fas fa-trash-alt"></i></Button>
                <h1 className="deck-title">Deck Name</h1>
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
              <Button 
                color="danger"
                className="trash-btn"><i className="fas fa-trash-alt"></i></Button>
                <h1 className="deck-title">Deck Name</h1>
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
              <Button 
                color="danger"
                className="trash-btn"><i className="fas fa-trash-alt"></i></Button>
                <h1 className="deck-title">Deck Name</h1>
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
              <Button 
                color="danger"
                className="trash-btn"><i className="fas fa-trash-alt"></i></Button>
                <h1 className="deck-title">Deck Name</h1>
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
              <Button 
                color="danger"
                className="trash-btn"><i className="fas fa-trash-alt"></i></Button>
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
              <Button 
                color="danger"
                className="trash-btn"><i className="fas fa-trash-alt"></i></Button>
                <h1 className="deck-title">Deck Name</h1>
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
              <Button 
                color="danger"
                className="trash-btn"><i className="fas fa-trash-alt"></i></Button>
                <h1 className="deck-title">Deck Name</h1>
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
        <DeckModal openCreate={this.state.openCreate} toggle={this.toggle} buttonLabel={this.props.buttonLabel} modal={this.props.modal} className="deck-create"/>
      </div>

    );
  }
}

export default ChooseDeck;
