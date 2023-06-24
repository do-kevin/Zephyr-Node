import { Container } from "inversify";
import { DeckRepository } from "src/flashcard/DeckRepository";

export class IocBase {
  container: Container;

  init = () => {
    this.container.bind(DeckRepository).to(DeckRepository).inSingletonScope();
    console.log(this.container);
    return this.container;
  };

  constructor() {
    this.container = new Container({
      autoBindInjectable: true,
      defaultScope: "Transient",
    });
  }
}
