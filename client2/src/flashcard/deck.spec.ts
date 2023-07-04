import { dispatch, initStore, select } from "src/tests/tools/testable-store";
import * as deckPresenter from "./DeckPresenter";

beforeEach(async () => {
  await initStore();
});

afterEach(() => jest.restoreAllMocks());

it("Should list public decks", async () => {
  await dispatch(deckPresenter.loadPublicDecks());

  const decks = select(deckPresenter.selectDecks);

  expect(decks.length).toBe(3);
  expect(decks[0].subject).toBe("Stubbing");
  expect(decks[1].subject).toBe("Mocking");
  expect(decks[decks.length - 1].subject).toBe("React");
});
