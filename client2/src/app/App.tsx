import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import { DiscoverFlashcardPage } from "src/flashcard/DiscoverFlashcardPage";
import { FlashcardDataLayer } from "src/flashcard/FlashcardDataLayer";
import { useState } from "react";
import { Provider } from "react-redux";
import { store } from "src/state/store";
import { DeckContainer } from "src/flashcard/DeckContainer";

function App() {
  const [decks, setDecks] = useState([]);

  const flashcardDal = new FlashcardDataLayer(decks, setDecks);

  const router = createBrowserRouter([
    {
      path: "/",
      element: <DeckContainer dal={flashcardDal} />,
    },
  ]);

  return (
    <Provider store={store}>
      <RouterProvider router={router} />;
    </Provider>
  );
}

export default App;
