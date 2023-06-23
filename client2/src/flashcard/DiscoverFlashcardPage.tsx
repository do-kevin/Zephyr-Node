import { useEffect } from "react";
import { FlashcardDataLayerInstance } from "./FlashcardDataLayer";

interface DiscoverFlashcardPageProps {
  dal: FlashcardDataLayerInstance;
}

export function DiscoverFlashcardPage(props: DiscoverFlashcardPageProps) {
  const { dal } = props;

  useEffect(() => {
    dal.getPublicDecks();
  }, []);

  return (
    <div>
      <div>Search bar here</div>
      <main>
        {dal.decks.map((d: any) => {
          return <p key={d.id}>{d.subject}</p>;
        })}
      </main>
    </div>
  );
}
