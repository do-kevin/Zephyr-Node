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
      <form className="search-form" style={{margin: "auto"}}>
      <input
          type="search"
          aria-label="Search"
          id="search-input"
          onChange={this.handleInputChange}
          placeholder="Search decks"
        />
        <button type="submit" className="btn btn-primary" id="search-btn" onClick={(e) => {this.props.handleFunction(e, this.state.searchValue)}}>
            <i className="fa fa-search text-grey" aria-hidden="true" />
          </button>
      </form>
  );
}
};

export default Search;
