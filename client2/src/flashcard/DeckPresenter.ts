import { RootState } from "src/core/store";
import * as repository from "./DeckRepository";

export const loadPublicDecks = repository.loadPublicDecks;

export const selectDecks = (state: RootState) => {
  const decksPM = repository.selectDecks(state);

  return decksPM || [];
};
