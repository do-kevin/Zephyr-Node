import { makeObservable, observable } from "mobx";
import { injectable, inject } from "inversify";
import { Deck } from "./flashcard";
import { Config } from "src/core/config";
import { HttpGateway } from "src/core/http-gateway";

@injectable()
export class DeckRepository {
  @inject(Config) config!: Config;
  @inject(Symbol.for("IDataGateway")) dataGateway!: HttpGateway;

  //   Our DeckModel
  decks: Deck[] = [];

  list = async () => {
    const url = `/decks/public`;

    const deckDto = await this.dataGateway.get(url);
    const data = await deckDto.json();

    const programmersModel = {
      success: false,
      message: null,
    };

    if (deckDto.ok) {
      programmersModel.success = true;
      this.decks = data;
      return programmersModel;
    }

    programmersModel.success = false;
    programmersModel.message = data.message;

    return programmersModel;
  };

  reset = async () => {
    this.decks = [];
  };

  constructor() {
    makeObservable(this, {
      decks: observable,
    });

    this.reset();
  }
}
