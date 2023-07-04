import { HttpGateway } from "src/core/http-gateway";
import { AppDispatch, AppGetState, RootState } from "src/core/store";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

const DECKS_LOADED_PUBLIC = "DECKS_LOADED_PUBLIC";

export interface LoadPublicDeckAction {
  type: "DECKS_LOADED_PUBLIC";
  payload: {
    decksPM: unknown[];
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

type Deck = {
  id: number;
  subject: string;
};

interface DecksState {
  decksPM: Deck[] | null;
}

const initialState = {
  decksPM: null,
};

export default function reducer(
  decksState: DecksState = initialState,
  action: AppAction
) {
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
}
