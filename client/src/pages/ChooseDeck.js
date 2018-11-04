import React from "react";
import axios from "axios";
import { Row, Col, Card, Button } from "reactstrap";
import {Link} from "react-router-dom"

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
      userId: JSON.parse(localStorage.getItem("user")).id,
      notFound: false
    };

    this.toggle = this.toggle.bind(this);
    this.getDecks = this.getDecks.bind(this);
  }

  toggle = () => {
    this.setState({
      openCreate: !this.state.openCreate
    });
  };

  getDecks = () => {
    axios.get("/decks/users/" + this.state.userId).then(response => {
      this.setState({
        decks: response.data
      });
      // this.getTags();
      console.log(response.data)
    });
  }

  deleteDeck = (id) => {
    axios.delete("/decks/" + id).then(response => {
      // console.log(response)
      this.getDecks();
    }); 
  }

  // getTags = () => {

  //   let deckArr = this.state.decks;

  //   deckArr.forEach((item, index) => {
  //     axios.get("/tags/" + item.id).then((response) => {

  //       let tagsArr = response.data.map((item) => {
  //         return item.tags;
  //       })

  //       deckArr[index].tags = tagsArr;
  //       this.setState({ decks: deckArr });
  //     })
  //   })
  // };

  searchTags = (event, tagInput) => {
    event.preventDefault();
    this.setState({
      notFound: false
    })
    axios.get("/decks/tags/" + tagInput)
      .then(response => {
        console.log(response.data)
        if (response.data === null || response.data.length === 0) {
          this.setState({
            notFound: true,
            decks: []
          });
        }
        else {
          console.log("save data")
          this.setState({
            decks: response.data
          })
        }
      })
  }

  componentDidMount() {
    this.getDecks();
  }


  deckIdSessionStorage = (id) =>{
    sessionStorage.setItem("deckId", id);
  }

  render() {
    // console.log("deck: " + this.state.decks);
    let renderDecks;
    if(!this.state.notFound) {
    renderDecks = this.state.decks.map((item, index) => {
      // console.log("============")
      // console.log(typeof (item.tags))

      return (
        <Col>
        
          <div className="decks decks-primary animated bounceIn">
            <Button color="danger" className="trash-btn" onClick={() => {this.deleteDeck(item.id)}}>
              <i className="fas fa-trash-alt" />
            </Button>
            <Link to="/deck" onClick={() => this.deckIdSessionStorage(item.id)}>
            <h1 className="deck-title text-center">{item.subject}</h1>
            </Link>
            <hr />
            <div className="tags-box">
              {item.Tags.map(elem => {
                return <p>#{elem.tags}</p>
              })}
            </div>
          </div>
        </Col>
      );
    });
  }
  else {
    renderDecks = <h3>Decks Not Found</h3>
    
  }
    return (
      <div>
        <Sidebar />
        <Search handleFunction={this.searchTags}/>
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
          getDecks={this.getDecks}
          buttonLabel={this.props.buttonLabel}
          modal={this.props.modal}
          className="deck-create"
        />
      </div>
    );
  }
}

export default ChooseDeck;
