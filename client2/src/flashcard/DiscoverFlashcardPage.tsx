import { useEffect } from "react";
import { FlashcardDataLayerInstance } from "./FlashcardDataLayer";
import { rootReducer } from "src/state/root.reducer";
import { store } from "src/state/store";

interface DiscoverFlashcardPageProps {
  dal: FlashcardDataLayerInstance;
  fetchPublicDecks: () => void;
  decks: any[];
}

export function DiscoverFlashcardPage(props: DiscoverFlashcardPageProps) {
  const {
    dal,

    fetchPublicDecks,
    decks,
  } = props;

  // console.log(store);

  useEffect(() => {
    fetchPublicDecks();
    dal.getPublicDecks();
    console.log(props);
  }, []);

  return (
    <div>
      <div>Search bar here</div>
      <main>
        {decks && decks.length
          ? decks.map((d: any) => {
              return <p key={d.id}>{d.subject}</p>;
            })
          : null}
      </main>
    </div>
  );
}
