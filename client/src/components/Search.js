import React from "react";
import "../css/Search.css"

const Search = () => {
  return (
    <div id="search-bar">
      <form className="form-inline">
        <input
          className="form-control"
          type="search"
          placeholder="Search #lorem-ipsum"
          aria-label="Search"
          id="search-input"
        />
        <div className="input-group-append">
          <button type="submit" className="btn btn-primary" id="search-btn">
            <i className="fa fa-search text-grey" aria-hidden="true" />
          </button>
        </div>
      </form>
    </div>
  );
};

export default Search;
