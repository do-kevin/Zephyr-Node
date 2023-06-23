export const DECK_ACTIONS = {
  LOAD_PUBLIC_DECKS: "LOAD_PUBLIC_DECKS",
  LOAD_PUBLIC_DECKS_SUCCESS: "LOAD_PUBLIC_DECKS_SUCCESS",
};

export const loadPublicDecks = () => {
  return {
    type: DECK_ACTIONS.LOAD_PUBLIC_DECKS,
  };
};

export const loadPublicDecksSuccess = (decks: unknown[]) => {
  return {
    type: DECK_ACTIONS.LOAD_PUBLIC_DECKS_SUCCESS,
    payload: decks,
  };
};
