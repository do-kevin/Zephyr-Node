import { DeckRepository } from "./DeckRepository";

export const createHttpDeckRepository = (): DeckRepository => {
  return {
    loadPublicDecks: () =>
      fetch("/api/decks/public").then((response) => response.json()),
  };
};
