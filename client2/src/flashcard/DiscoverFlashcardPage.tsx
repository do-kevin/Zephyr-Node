import { useEffect } from "react";
import * as presenter from "./DeckPresenter";
import { DeckList } from "./DeckList";
import { useAppDispatch, useAppSelector } from "./DeckRepository";

export const DiscoverFlashcardPage = () => {
  const dispatch = useAppDispatch();
  const decksViewModel = useAppSelector(presenter.selectDecks);

  useEffect(() => {
    dispatch<any>(presenter.loadPublicDecks());
  }, [dispatch]);

  return (
    <div>
      <div>Search bar here</div>
      <main>
        <DeckList viewModel={decksViewModel} />
      </main>
    </div>
  );
};
