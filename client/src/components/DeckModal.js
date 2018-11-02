import React from "react";
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
  handleName(event) {
    this.setState({deckName: event.target.value});
    console.log(this.state.deckName);
  } 

  handleTags(event) {
    this.setState({deckTags: event.target.value});
    console.log(this.state.deckTags);
  } 

  componentDidMount() {
    var { openCreate } = this.props;

    this.setState({
      openCreate
    });
  }

  render() {
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
                <Input type="text" name="deckname" id="deckname" onChange={this.handleName}/>
              </FormGroup>
              <FormGroup>
                <Label for="decktags">Tags:</Label>
                <Input type="text" name="decktags" id="decktags" onChange={this.handleTags}/>
              </FormGroup>
            </Form>
          </ModalBody>
          <ModalFooter>
            <Button color="primary">
              <i className="fas fa-save" />
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default DeckModal;
