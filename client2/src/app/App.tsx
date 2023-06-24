import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import { DiscoverFlashcardPage } from "src/flashcard/DiscoverFlashcardPage";
import { Provider } from "src/core/providers/inversify-context";
import { configure } from "mobx";
import { container } from "src/inversion-of-control/ioc";

configure({
  enforceActions: "never",
  computedRequiresReaction: false,
  reactionRequiresObservable: false,
  observableRequiresReaction: false,
  disableErrorBoundaries: false,
});

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <DiscoverFlashcardPage />,
    },
  ]);

  return (
    <Provider container={container}>
      <RouterProvider router={router} />
    </Provider>
  );
}

export default App;
