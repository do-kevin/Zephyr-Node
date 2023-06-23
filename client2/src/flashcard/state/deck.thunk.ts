import { DeckRepository } from "../repositories/DeckRepository";
import {
  loadPublicDecks,
  loadPublicDecksSuccess,
} from "src/flashcard/state/deck.actions";

export const fetchPublicDecks = () => {
  return (dispatch: any, getState: any, deckRepository: DeckRepository) => {
    dispatch(loadPublicDecks());
    deckRepository.loadPublicDecks().then((decks: any[]) => {
      dispatch(loadPublicDecksSuccess(decks));
    });
  };
};
