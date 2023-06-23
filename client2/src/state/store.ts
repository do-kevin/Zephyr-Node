import { configureStore } from "@reduxjs/toolkit";
import { rootReducer } from "./root.reducer";
import { createHttpDeckRepository } from "src/flashcard/repositories/HttpDeckRepository";

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: createHttpDeckRepository(),
      },
    }),
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
