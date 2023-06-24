import { injectable, inject } from "inversify";
import { DeckRepository } from "./DeckRepository";
import { makeObservable, observable } from "mobx";

@injectable()
export class DeckPresenter {
  @inject(DeckRepository) deckRepository!: DeckRepository;
  statusMessage: null | string = null;

  get decks() {
    return this.deckRepository.decks;
  }

  async list() {
    const programmersModel = await this.deckRepository.list();
    console.log(programmersModel);
    if (!programmersModel.success) {
      this.statusMessage = programmersModel.message;
    }
  }

  reset() {
    this.statusMessage = null;
  }

  constructor() {
    makeObservable(this, {
      statusMessage: observable,
    });
  }
}
