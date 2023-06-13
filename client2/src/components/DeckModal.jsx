import React from "react";
import axios from "axios";
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  Label,
} from "reactstrap";

class DeckModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      deckName: "",
      deckTags: "",
      showTagsValidation: false,
      userId: JSON.parse(localStorage.getItem("user")).id,
    };
  }

  // handleName & handleTags cannot read property of undefn.
  handleName = (event) => {
    this.setState({ deckName: event.target.value });
  };

  handleTags = (event) => {
    this.setState({
      deckTags: event.target.value,
    });

    if (event.target.value === "") {
      this.setState({ showTagsValidation: true });
    } else {
      this.setState({ showTagsValidation: false });
    }
  };

  createTagsForDeck = () => {
    let arr = [];

    if (this.state.deckTags !== "") {
      axios
        .post("/api/decks/" + this.state.userId, {
          subject: this.state.deckName,
        })
        .then((response) => {
          // console.log(response);

          if (this.state.deckTags !== "") {
            arr = this.state.deckTags.trim().split(" ");

            arr.map((item) => {
              let obj = {
                deckId: response.data.id,
                tags: item,
              };

              axios.post("/api/tags", obj).then((response) => {
                this.props.getDecks();
              });

              return null;
            });
            this.props.toggle();
            // this.props.getDecks();
            this.setState({
              deckName: "",
              deckTags: "",
            });
          }
        });
    } else {
      this.setState({ showTagsValidation: true });
    }

    return null;
  };

  componentDidMount() {
    var { openCreate } = this.props;

    this.setState({
      openCreate,
    });
  }

  render() {
    // console.log(this.state.deckName)

    let displayTagValid;

    if (this.state.showTagsValidation === false) {
      displayTagValid = "";
    } else {
      displayTagValid = (
        <p
          style={{
            color: "hsla(3, 100%, 50%, 1)",
          }}
        >
          Tags field needs minimum one character.
        </p>
      );
    }

    return (
      <div>
        <Modal
          isOpen={this.props.openCreate}
          toggle={this.props.toggle}
          className={this.props.className}
        >
          <ModalHeader toggle={this.props.toggle}></ModalHeader>
          <ModalBody>
            <Form>
              <FormGroup>
                <Label style={{ fontWeight: 500 }} for="deckname">
                  Deck name
                </Label>
                <br />
                <input
                  type="text"
                  name="deckname"
                  className="create-deck-input"
                  value={this.state.deckName}
                  onChange={this.handleName}
                  maxLength="25"
                />
              </FormGroup>
              <FormGroup>
                <Label style={{ fontWeight: 500 }} for="decktags">
                  Tags
                </Label>
                <br />
                <input
                  pattern=".{1,}"
                  required
                  title="1 character minimum"
                  type="text"
                  name="decktags"
                  className="create-deck-input"
                  value={this.state.deckTags}
                  onChange={this.handleTags}
                  maxLength="50"
                  placeholder="Ex: tag_name tag_name2"
                />
                <p
                  style={{
                    lineHeight: 1.2,
                    fontSize: "14px",
                  }}
                >
                  No hashtags are required. <br />
                  To make multiple tags, include a space between each word.
                </p>
                {displayTagValid}
              </FormGroup>
            </Form>
          </ModalBody>
          <ModalFooter>
            <button
              type="submit"
              className="create-deck-modal-btn"
              onClick={this.createTagsForDeck}
            >
              <i className="fas fa-layer-group" /> Create deck
            </button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default DeckModal;
