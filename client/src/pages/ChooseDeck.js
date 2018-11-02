import React from "react";
import axios from "axios";
import { Row, Col, Card, Button } from "reactstrap";

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
      openCreate: false,
      deckName: "",
      decks: [],
      userId: 1
    };

    this.toggle = this.toggle.bind(this);
  }

  toggle = () => {
    this.setState({
      openCreate: !this.state.openCreate
    });
  };

  getDeckInfo() {
    axios.get("/decks/2").then(response => {
      console.log(response);
      this.setState({
        deckName: response.data.subject
      });
      console.log(this.state.deckName);
    });
  }

  getDecks() {
    axios.get("/decks/users/" + this.state.userId).then(response => {
      this.setState({
        decks: [...response.data]
      });
    });
  }

  componentDidMount() {
    this.getDeckInfo();
    this.getDecks();
  }

  render() {
    console.log("=====test====");
    let renderDecks = this.state.decks.map((item, index) => {
      return (
        <Col>
          <div className="decks decks-primary animated bounceIn">
            <Button color="danger" className="trash-btn">
              <i className="fas fa-trash-alt" />
            </Button>
            <h1 className="deck-title text-center">{item.subject}</h1>
            <hr />
            <div className="tags-box">
              <p>
                #test #test1 #test2 #test3 #test4 #test5 #test #test1 #test2
                #test3 #test4 #test5
              </p>
            </div>
          </div>
        </Col>
      );
    });

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
            {renderDecks}
          </Row>
        </div>
        <DeckModal
          openCreate={this.state.openCreate}
          toggle={this.toggle}
          buttonLabel={this.props.buttonLabel}
          modal={this.props.modal}
          className="deck-create"
        />
      </div>
    );
  }
}

export default ChooseDeck;
