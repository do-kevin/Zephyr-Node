import React from "react";
import "../css/Search.css"

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchValue: ""
    };
  }

  handleInputChange = (event) => {
    this.setState({
      searchValue: event.target.value
    })
    console.log(event.target.value)
  }

  render() {
  return (
    <div id="search-bar">
      <form className="form-inline">
        <input
          className="form-control"
          type="search"
          placeholder="Search #lorem-ipsum"
          aria-label="Search"
          id="search-input"
          onChange={this.handleInputChange}
        />
        <div className="input-group-append">
          <button type="submit" className="btn btn-primary" id="search-btn" onClick={(e) => this.props.handleFunction(e, this.state.searchValue)}>
            <i className="fa fa-search text-grey" aria-hidden="true" />
          </button>
        </div>
      </form>
    </div>
  );
}
};

export default Search;
