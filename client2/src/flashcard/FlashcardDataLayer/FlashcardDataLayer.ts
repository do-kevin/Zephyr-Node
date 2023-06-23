import { lazyInject } from "../deck.ioc";

export type FlashcardDataLayerInstance = InstanceType<
  typeof FlashcardDataLayer
>;

export class FlashcardDataLayer {
  @lazyInject("deck")
  private deck: any;

  decks: any[];
  setDecks: (param: any) => void;

  getPublicDecks = async () => {
    console.log("hit");
    const response = await fetch("/api/decks/public");
    const data = await response.json();
    console.log(this.deck);

    // this.decks = data;
    this.setDecks(this.decks);
  };

  constructor(decks: any[], setDecks: any) {
    this.decks = decks;
    this.setDecks = setDecks;
    if (this.deck) {
      console.log(this.deck);
      this.deck = this.deck.subscribe((newState: any) => {
        console.log(newState);
        return newState;
      });

      console.log(this.deck);
    }
  }
}
