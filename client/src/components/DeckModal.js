import React from "react";
import axios from "axios";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  Label,
  Input
} from "reactstrap";


class DeckModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      deckName: "",
      deckTags: ""
    };
  }

  // handleName & handleTags cannot read property of undefn.
  handleName = (event) => {
    this.setState({deckName: event.target.value});
  } 

  handleTags = (event) => {
    this.setState({deckTags: event.target.value});
  }

  getDeckInfo() {
    axios.get("/decks/1").then((response) => {
      console.log(response.data);
    })
  }
  
  createTagsForDeck = () => {
    let data = {
      deckId: 1,
      deckName: this.state.deckName,
      deckTags: this.state.deckTags
    }

    axios.post("/tags/", data).then((response) => {
      console.log(response)
    });
  }

  componentDidMount() {
    this.getDeckInfo();

    var { openCreate } = this.props;

    this.setState({
      openCreate
    });
  }

  render() {
    console.log(this.state.deckName)
    return (
      <div>
        <Modal
          isOpen={this.props.openCreate}
          toggle={this.props.toggle}
          className={this.props.className}
        >
          <ModalHeader toggle={this.props.toggle}>Create Deck</ModalHeader>
          <ModalBody style={{ margin: "0 2% 0 5%" }}>
            <Form>
              <FormGroup>
                <Label for="deckname">Deck Name:</Label>
                <Input type="text" name="deckname" id="deckname" value={this.state.deckName} onChange={this.handleName}/>
              </FormGroup>
              <FormGroup>
                <Label for="decktags">Tags:</Label>
                <Input type="text" name="decktags" id="decktags" value={this.state.deckTags} onChange={this.handleTags}/>
              </FormGroup>
            </Form>
          </ModalBody>
          <ModalFooter>
            <Button 
              type="submit" 
              color="primary"
              onClick={this.createTagsForDeck}>
              <i className="fas fa-save" />
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default DeckModal;
