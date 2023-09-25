import { useEffect } from "react";
import * as presenter from "./DeckPresenter";
import { DeckList } from "./DeckList";
import { useAppDispatch, useAppSelector } from "./DeckRepository";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";

export const DiscoverFlashcardPage = () => {
  const dispatch = useAppDispatch();
  const decksVM = useAppSelector(presenter.selectDecks);

  useEffect(() => {
    dispatch<any>(presenter.loadPublicDecks());
  }, [dispatch]);

  return (
    <div style={{ backgroundColor: "#fffaf5" }}>
      <header className="py-3 px-3 px-sm-5 border-bottom border-dark mb-4">
        <nav className="d-flex flex-row flex-wrap align-items-center">
          <h1 className="fs-5 fw-bold mb-0 col" style={{ color: "#FA963A" }}>
            NoteCram
          </h1>
          <div className="d-flex justify-content-between align-items-center col-8">
            <ul
              className="list-group list-group-horizontal list-unstyled"
              style={{ fontSize: 12 }}
            >
              <li className="me-2">Features</li>
              <li className="me-2">Discover</li>
              <li>Pricing</li>
            </ul>
            <p className="d-inline text-end my-auto" style={{ fontSize: 12 }}>
              Sign in
            </p>
          </div>
        </nav>
      </header>
      <main className="px-3 px-sm-5">
        <article>
          <h1 className="fw-bold mb-3">Discover</h1>
          <>
            <style type="text/css">
              {`
                #discoverInput::placeholder {
                  color: #545454;
                }
              `}
            </style>
            <Form className="d-flex align-items-center mb-3">
              <InputGroup className="mb-3">
                <div className="bg-white d-block border border-end-0 border-dark px-2 py-2  rounded-start-5">
                  <Button
                    variant="warning"
                    id="button-addon1"
                    className="rounded-5"
                  >
                    <i className="bi bi-search"></i>
                  </Button>
                </div>
                <Form.Control
                  aria-describedby="discoverInput"
                  id="discoverInput"
                  className="border-dark border-start-0 py-2 rounded-end-5"
                  placeholder="Find a deck"
                />
              </InputGroup>
            </Form>
          </>
          <DeckList viewModel={decksVM} />
        </article>
      </main>
    </div>
  );
};
