import React from "react";
import "../css/Search.css"

const Search = () => {
  return (
    <div class="form-group md-form form-sm form-2 pl-0 content-align" id="search-bar">
      <form class="form-inline">
        <input
          class="form-control"
          type="search"
          placeholder="Search #lorem-ipsom"
          aria-label="Search"
        />
        <div class="input-group-append">
          <button type="submit" className="btn btn-primary">
            <i class="fa fa-search text-grey" aria-hidden="true" />
          </button>
        </div>
      </form>
    </div>
  );
};

export default Search;
