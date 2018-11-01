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
  Input,
  FormText
} from "reactstrap";
import { object } from "twilio/lib/base/serialize";

class DeckModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
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
          <ModalBody 
            style={{margin: "0 2% 0 5%"}}>
            <Form>
              <FormGroup>
                <Label for="deckname">Deck Name:</Label>
                <Input
                  type="text"
                  name="deckname"
                  id="deckname"
                />
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
