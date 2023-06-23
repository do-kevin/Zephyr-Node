import { connect } from "react-redux";
import { fetchPublicDecks as _fetchPublicDecks } from "./state/deck.thunk";
import { DiscoverFlashcardPage } from "./DiscoverFlashcardPage";
import { store as Store } from "src/state/store";

const mapStateToProps = (state: any) => {
  const { loading, decks } = state.deck;
  //   console.log(state);
  return {
    decks,
    loading,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    fetchPublicDecks: () => dispatch(_fetchPublicDecks()),
  };
};

export class DeckContainerClass {
  store: any;

  //   fetchPublicDecks = () => {
  //     _fetchPublicDecks(this.store.dispatch, this.store.getState);
  //   };

  getState = Store.getState();

  constructor() {
    this.store = Store;
    console.log(Store);

    if (this.store) {
      Store.subscribe((newState: unknown) => {
        console.log(newState);
      });
    }
  }
}

export const DeckContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(DiscoverFlashcardPage);
