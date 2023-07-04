import { combineReducers } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import decksReducer, { AppAction } from "../flashcard/DeckRepository";
import { HttpGateway } from "./http-gateway";
import { ThunkDispatch } from "redux-thunk";

const rootReducer = combineReducers({
  decksState: decksReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

const store = (httpGateway: InstanceType<typeof HttpGateway>) => {
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
