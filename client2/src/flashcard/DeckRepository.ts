import { HttpGateway } from "src/core/http-gateway";
import { AppDispatch, AppGetState, RootState } from "src/core/store";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

const DECKS_LOADED_PUBLIC = "DECKS_LOADED_PUBLIC";

export interface LoadPublicDeckAction {
  type: "DECKS_LOADED_PUBLIC";
  payload: {
    decksPM: Deck[];
  };
}

export type AppAction = LoadPublicDeckAction;

export const loadPublicDecks =
  () =>
  async (
    dispatch: AppDispatch,
    _getState: AppGetState,
    { http }: { http: HttpGateway }
  ) => {
    const url = `/decks/public`;

    const decksDTO = await http.get(url);
    const decksProgrammersModel = await decksDTO.json();

    console.log(decksProgrammersModel);

    dispatch({
      type: DECKS_LOADED_PUBLIC,
      payload: {
        decksPM: decksProgrammersModel,
      },
    });
  };

type DispatchFunc = () => AppDispatch;
export const useAppDispatch: DispatchFunc = useDispatch;

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const selectDecks = (state: RootState) => {
  return state.decksState.decksPM;
};

interface Deck {
  id: number;
  userId: number;
  subject: string;
  Tags: string[];
  private: boolean;
  alertInterval: number;
}

interface DecksState {
  decksPM: Deck[] | null;
}

const initialState: DecksState = {
  decksPM: null,
};

const reducer = (decksState = initialState, action: AppAction): DecksState => {
  switch (action.type) {
    case DECKS_LOADED_PUBLIC: {
      return {
        ...decksState,
        decksPM: action.payload.decksPM,
      };
    }
    default: {
      return decksState;
    }
  }
};

export default reducer;
