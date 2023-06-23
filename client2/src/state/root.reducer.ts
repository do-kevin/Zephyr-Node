import { deck } from "src/flashcard/state/deck.reducer";
import { combineReducers } from "redux";

const rootReducer = combineReducers({
  deck,
});

export { rootReducer };
