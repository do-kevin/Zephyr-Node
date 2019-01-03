import React from "react";
import "../css/Search.css";
import DOMPurify from "dompurify";

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchValue: ""
    };
  }

  handleInputChange = (event) => {
    this.setState({
      searchValue: (DOMPurify.sanitize(event.target.value))
    });
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
          placeholder="Ex: demo"
        />
        <button 
          type="submit" 
          className="btn btn-primary" 
          id="search-btn" 
          data-balloon="To find specific decks, enter the associated tag name" 
          data-balloon-pos="left"
          onClick={this.state.searchValue !== "" ? (e) => {this.props.handleFunction(e, this.state.searchValue)} : this.props.displayPublicDecks }>
            <i className="fa fa-search text-grey" aria-hidden="true" />
          </button>
      </form>
  );
}
};

export default Search;
