import { rest } from "msw";
import { getDeckListStub } from "../stubs/FlashcardDeckStubs";

export const handlers = [
  rest.get("/api/decks/public", (_req, res, ctx) => {
    return res(ctx.status(200), ctx.json(getDeckListStub()));
  }),
];
