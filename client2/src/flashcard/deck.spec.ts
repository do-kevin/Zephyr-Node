// import { TestHarness } from "src/tests/tools/test-harness";
// import { DeckPresenter } from "./DeckPresenter";
// import { DeckRepository } from "./DeckRepository";

// let testHarness = null;
// let deckPresenter: InstanceType<typeof DeckPresenter>;
// let deckRepository: InstanceType<typeof DeckRepository>;

// beforeEach(async () => {
//   testHarness = new TestHarness();
//   testHarness.init();

//   deckPresenter = testHarness.container.get(DeckPresenter);
//   deckRepository = testHarness.container.get(DeckRepository);
// });

// afterEach(() => jest.restoreAllMocks());

// it("Should list public decks", async () => {
//   await deckRepository.list();

//   const decks = deckPresenter.decks;

//   expect(decks.length).toBe(3);
//   expect(decks[0].subject).toBe("Stubbing");
//   expect(decks[1].subject).toBe("Mocking");
//   expect(decks[decks.length - 1].subject).toBe("React");
// });
