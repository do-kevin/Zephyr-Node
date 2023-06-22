import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import { DiscoverFlashcardPage } from "src/flashcard/DiscoverFlashcardPage";
import FlashcardDataLayer from "src/flashcard/FlashcardDataLayer/FlashcardDataLayer";
import { useState } from "react";

function App() {
  const [decks, setDecks] = useState([]);

  const flashcardDal = new FlashcardDataLayer(decks, setDecks);

  const router = createBrowserRouter([
    {
      path: "/",
      element: <DiscoverFlashcardPage dal={flashcardDal} />,
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
