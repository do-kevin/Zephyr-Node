import { matchSorter } from "match-sorter";
import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Pagination from "react-bootstrap/Pagination";
import { useForm } from "react-hook-form";

import { DeckList } from "./DeckList";
import * as presenter from "./DeckPresenter";
import { useAppDispatch, useAppSelector } from "./DeckRepository";

export const DiscoverFlashcardPage = () => {
  const dispatch = useAppDispatch();
  const decksVM = useAppSelector(presenter.selectDecks);

  const [searchValue, setSearchValue] = useState<string | null | undefined>("");
  const [resultViewModel, setResultViewModel] = useState<any[]>([]);

  const [showResults, setShowResults] = useState(false);

  const [showMatches, setShowMatches] = useState(false);

  useEffect(() => {
    const watchQuery = () => {
      if (searchValue && searchValue.length && resultViewModel.length >= 1) {
        setShowMatches(true);

        return null;
      }

      setShowMatches(false);
    };

    watchQuery();
  }, [searchValue, resultViewModel.length]);

  const onSubmit = (_values: any) => {
    resultsOnPress();
  };

  const onError = (error: any) => {
    console.log("ERROR:::", error);
  };

  const {
    register,
    handleSubmit,
    // getValues,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      searchValue,
    },
  });

  const resultsOnPress = () => {
    setShowResults(true);
    setShowMatches(false);
  };

  useEffect(() => {
    dispatch<any>(presenter.loadPublicDecks());
  }, [dispatch]);

  useEffect(() => {
    const subscription = watch((value) => {
      setSearchValue(value.searchValue);

      if (searchValue) {
        const result = matchSorter(decksVM, searchValue, { keys: ["subject"] });
        setResultViewModel(result);
      }
    });

    return () => subscription.unsubscribe();
  }, [watch, decksVM, searchValue]);

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(20);

  const indexOfLastItem = currentPage * itemsPerPage;

  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  const currentItems = showResults
    ? resultViewModel.slice(indexOfFirstItem, indexOfLastItem)
    : decksVM.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = showResults
    ? Math.ceil(resultViewModel.length / itemsPerPage)
    : Math.ceil(decksVM.length / itemsPerPage);

  const renderPageNumbers = () => {
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
      pages.push(
        <Pagination.Item
          key={i}
          active={i === currentPage}
          onClick={() => setCurrentPage(i)}
        >
          {i}
        </Pagination.Item>
      );
    }
    return pages;
  };

  return (
    <div className="bg-light">
      <header className="py-3 px-3 px-sm-5 border-bottom border-dark mb-4">
        <div className="mx-auto" style={{ maxWidth: 1200 }}>
          <nav className="d-flex flex-row flex-wrap align-items-center">
            <h1 className="fs-5 fw-bold mb-0 col-2 text-primary">NoteCram</h1>
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
                <Button>Sign in</Button>
              </p>
            </div>
          </nav>
        </div>
      </header>
      <div className="border border-primary-md">
        This should have a primary border on medium screens.
      </div>
      <main className="px-3 px-sm-5 pb-4">
        <article className="mx-auto" style={{ maxWidth: 1200 }}>
          <div className="d-flex align-items-end gap-4 border border-primary border-primary-md">
            <h1
              className="fw-bold mb-3 col position-relative border-top border-sm-danger border-top-md-0"
              style={{ fontSize: 128, right: "0.5rem" }}
            >
              Discover
            </h1>
            <>
              <style type="text/css">
                {`
                #discoverInput::placeholder {
                  color: #545454;
                }
              `}
              </style>
              <Form
                className="custom-search d-flex align-items-center flex-column col"
                onSubmit={handleSubmit(onSubmit, onError)}
              >
                <InputGroup className="mb-3">
                  <div
                    id="search-btn-container"
                    className="bg-white d-block border border-end-0 border-dark px-2 py-2  rounded-start-5"
                  >
                    <Button
                      type="submit"
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
                    {...register("searchValue", { required: true })}
                  />
                  {showMatches && (
                    <div
                      className="position-absolute top-100 bg-white container py-3 px-2 mt-2 shadow"
                      style={{ border: "1px solid #FA963A", borderRadius: 4 }}
                    >
                      <ul className="list-group mb-0">
                        {resultViewModel.map((r) => {
                          return (
                            <li
                              className="list-group-item border-0 mb-2 rounded"
                              style={{
                                background: "#FEF7F1",
                                color: "#F97D0B",
                              }}
                              onClick={() => resultsOnPress()}
                            >
                              {r.subject}
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  )}
                </InputGroup>
              </Form>
            </>
          </div>
          {showResults && (
            <Button
              className="text-decoration-none py-0 ps-0 pe-1 mb-1"
              variant="link"
              onClick={() => {
                setShowResults(false);
                setShowMatches(false);
              }}
            >
              <span>
                <i className="bi bi-arrow-left"></i> Go back
              </span>
            </Button>
          )}
          <h2 className="text-primary fw-bold mb-4">Flashcard Decks</h2>
          <div className="d-grid">
            <DeckList viewModel={currentItems} />
            <div className="d-flex justify-content-center mt-4 pb-4 gap-2">
              <Pagination className="d-flex flex-wrap">
                <Pagination.First onClick={() => setCurrentPage(1)} />
                <Pagination.Prev
                  onClick={() => {
                    let previousPageNumber = currentPage - 1;
                    if (previousPageNumber <= 0) {
                      previousPageNumber = 1;
                    }

                    setCurrentPage(previousPageNumber);
                  }}
                />
                {renderPageNumbers()}
                <Pagination.Next
                  onClick={() => {
                    let nextPageNumber = currentPage + 1;
                    if (nextPageNumber > totalPages) {
                      nextPageNumber = totalPages;
                    }

                    setCurrentPage(nextPageNumber);
                  }}
                />
                <Pagination.Last onClick={() => setCurrentPage(totalPages)} />
              </Pagination>
              <style type="text/css">
                {`
                #my-dropdown {
                  color: var(--bs-secondary);
                }
              `}
              </style>
              <DropdownButton title={itemsPerPage} id="my-dropdown">
                {[5, 10, 15, 20].map((cardsPerPage) => {
                  return (
                    <Dropdown.Item
                      onClick={() => setItemsPerPage(cardsPerPage)}
                    >
                      {cardsPerPage}
                    </Dropdown.Item>
                  );
                })}
              </DropdownButton>
            </div>
          </div>
        </article>
      </main>
    </div>
  );
};
