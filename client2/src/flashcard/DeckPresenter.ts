import { RootState } from "src/core/store";
import * as repository from "./DeckRepository";

export const loadPublicDecks = repository.loadPublicDecks;

export const selectDecks = (state: RootState) => {
  const decksPM = repository.selectDecks(state);

  const decksVM = decksPM?.map((d) => {
    return {
      id: d.id,
      subject: d.subject,
    };
  });

  return decksVM || [];
};
