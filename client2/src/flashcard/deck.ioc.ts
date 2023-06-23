import getDecorators from "inversify-inject-decorators";
import { Container } from "inversify";
import { DeckContainerClass } from "./DeckContainer";

const container = new Container();

const { lazyInject } = getDecorators(container, false);

container
  .bind<InstanceType<typeof DeckContainerClass>>("deck")
  .to(DeckContainerClass);

export { lazyInject };
