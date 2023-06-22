export default class FlashcardDataLayer {
  decks: unknown[];
  setDecks: (param: any) => void;

  getPublicDecks = async () => {
    console.log("hit");
    const response = await fetch("/api/decks/public");
    const data = await response.json();

    this.decks = data;
    this.setDecks(this.decks);
  };

  constructor(decks: unknown[], setDecks: any) {
    this.decks = decks;
    this.setDecks = setDecks;
  }
}
