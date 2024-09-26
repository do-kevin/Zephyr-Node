import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { DiscoverFlashcardPage } from "src/flashcard/DiscoverFlashcardPage";
import { Provider } from "react-redux";
import { HttpGateway } from "src/core/http-gateway";
import createStore from "src/core/store";
import { Config } from "src/core/config";

function App() {
  const config = new Config();
  const httpGateway = new HttpGateway(config);

  const store = createStore(httpGateway);

  const router = createBrowserRouter([
    {
      path: "/",
      element: <DiscoverFlashcardPage />,
    },
  ]);

  return (
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  );
}

export default App;
