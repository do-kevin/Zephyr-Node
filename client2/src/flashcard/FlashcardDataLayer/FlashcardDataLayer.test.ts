import { FlashcardDataLayer } from "./FlashcardDataLayer";

let decks: unknown[] = [];

const setDecks = (deckArg: any) => {
  decks = deckArg;
};

it("Should load flashcard decks", async () => {
  const dal = new FlashcardDataLayer(decks, setDecks);

  await dal.getPublicDecks();

  console.log(dal.decks);

  expect(dal.decks.length).toBe(3);
});
