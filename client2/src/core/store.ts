import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import { ThunkDispatch } from "redux-thunk";

import decksReducer, { AppAction } from "../flashcard/DeckRepository";
import { FakeHttpGateway } from "./fake-http-gateway";
import { HttpGateway } from "./http-gateway";

const rootReducer = combineReducers({
  decksState: decksReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

const store = (
  httpGateway:
    | InstanceType<typeof HttpGateway>
    | InstanceType<typeof FakeHttpGateway>
) => {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        thunk: {
          extraArgument: {
            http: httpGateway,
          },
        },
      }),
  });
};

export type AppDispatch = ThunkDispatch<
  RootState,
  InstanceType<typeof HttpGateway>,
  AppAction
>;

export type AppGetState = () => RootState;

export default store;
