import { DECK_ACTIONS } from "./deck.actions";
import type { DeckState } from "./deck.state";

const initialState = {
  decks: [],
  loading: false,
};

export const deck = (state: DeckState = initialState, action: string) => {
  const { type, payload } = action as any;

  switch (type) {
    case DECK_ACTIONS.LOAD_PUBLIC_DECKS:
      return {
        ...state,
        loading: true,
      };
    case DECK_ACTIONS.LOAD_PUBLIC_DECKS_SUCCESS:
      //   console.log(state);
      return {
        ...state,
        decks: payload,
        loading: false,
      };
    default:
      return state;
  }
};
