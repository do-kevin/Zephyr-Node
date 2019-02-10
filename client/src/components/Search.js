import React from 'react';
import '../css/Search.scss';
import DOMPurify from 'dompurify';

class Search extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			searchValue: ''
		};
	}

	handleInputChange = (event) => {
		this.setState({
			searchValue: DOMPurify.sanitize(event.target.value)
		});
		console.log(event.target.value);
	};

	render() {
		return (
			<form className="search-form" style={{ margin: 'auto' }}>
				<input
					type="search"
					aria-label="Search"
					id="search-input"
					onChange={this.handleInputChange}
					placeholder="Ex: demo"
				/>
				<button
					type="submit"
					className="btn btn-primary search-form__btn search-form__btn--primary"
					data-balloon="To find specific decks, enter the associated tag name"
					data-balloon-pos="down"
					data-balloon-length="medium"
					onClick={
						this.state.searchValue !== '' ? (
							(e) => {
								this.props.handleFunction(e, this.state.searchValue);
							}
						) : (
							this.props.displayPublicDecks
						)
					}
				>
					<i className="fa fa-search text-grey" aria-hidden="true" />{' '}
					<span className="search-btn__text">Search</span>
				</button>
				<button className="btn btn-warning search-form__btn search-form__btn--warning" onClick={this.props.viewPublicDecks}>
					<i className="fas fa-layer-group" /> <span className="search-btn__text">Public Decks</span>
				</button>
			</form>
		);
	}
}

export default Search;
