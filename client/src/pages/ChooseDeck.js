import React from 'react';
import axios from 'axios';
import { Row, Col, Card, Button } from 'reactstrap';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import Sidebar from '../components/Sidebar';
import Search from '../components/Search';
import DeckModal from '../components/DeckModal';

import '../css/Decks.scss';

const Menu = styled.menu`
	#sidebar {
		top: 0;
	}
	.sidebar-nav__link--decks {
		background: white;
		box-shadow: 0px 2px 1px #888, 0px -2px 1px #888;
	}
	.sidebar-nav__link--decks .sidebar-nav__text {
		color: black;
	}
`;

class ChooseDeck extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			openCreate: false,
			deckName: '',
			decks: [],
			userId: JSON.parse(localStorage.getItem('user')).id,
			notFound: false
		};

		this.toggle = this.toggle.bind(this);
		this.getDecks = this.getDecks.bind(this);
	}

	toggle = () => {
		this.setState({
			openCreate: !this.state.openCreate
		});
	};

	getDecks = () => {
		axios.get('/decks/users/' + this.state.userId).then((response) => {
			this.setState({
				decks: response.data
			});
			// this.getTags();
			// console.log(response.data)
		});
	};

	deleteDeck = (id) => {
		axios.delete('/decks/' + id).then((response) => {
			// console.log(response)
			this.getDecks();
		});
	};

	searchTags = (event, tagInput) => {
		event.preventDefault();
		this.setState({
			notFound: false
		});
		// console.log("input: " +tagInput.replace(/\s/g, ''))
		axios.get('/decks/tags/' + tagInput.replace(/\s/g, '')).then((response) => {
			console.log(response.data);
			if (response.data === null || response.data.length === 0) {
				this.setState({
					notFound: true,
					decks: []
				});
			} else {
				// console.log('save data');
				this.setState({
					decks: response.data
				});
			}
		});
	};

	showMyDecks = () => {
		this.setState({
			notFound: false
		});
		this.getDecks();
	};

	componentDidMount() {
		this.getDecks();
	}

	deckIdSessionStorage = (id) => {
		sessionStorage.setItem('deckId', id);
	};

	render() {
		// console.log("deck: " + this.state.decks);
		let renderDecks;
		if (!this.state.notFound) {
			renderDecks = this.state.decks.map((item, index) => {
				// console.log("============")
				// console.log(typeof (item.tags))

				return (
					<Col key={item.id}>
						<div className="decks decks-primary animated bounceIn">
							<Button
								color="danger"
								className="trash-btn"
								onClick={() => {
									this.deleteDeck(item.id);
								}}
							>
								<i className="fas fa-trash-alt" />
							</Button>
							<Link to="/deck" onClick={() => this.deckIdSessionStorage(item.id)}>
								<div className="container">
									<h1 className="deck-title text-center">{item.subject}</h1>
								</div>
							</Link>
							<div className="tags-box">
								{item.Tags.map((elem) => {
									return (
										<button
											key={elem.id}
											className="tag-btn"
											onClick={(e) => this.searchTags(e, elem.tags)}
										>
											#{elem.tags}{' '}
										</button>
									);
									// <p key={elem.id}>#{elem.tags}</p>
								})}
							</div>
						</div>
					</Col>
				);
			});
		} else {
			renderDecks = (
				<div style={{ margin: '20px auto 0 auto' }}>
					<h3 className="animated flipInX" style={{ color: 'red' }}>
						Decks Not Found
					</h3>
					<Button
						className="animated flipInX"
						color="info"
						onClick={this.showMyDecks}
						style={{ margin: 'auto' }}
					>
						Show My Decks
					</Button>
				</div>
			);
		}
		return (
			<div>
				{this.props.handleUserRedirect()} {/* Logout redirection */}
				<Menu>
					<Sidebar handleUserLogout={this.props.handleUserLogout} style={{ background: 'red' }} />
				</Menu>
				<main id="decks-page">
					<div id="decks-page__search-wrapper">
						<Search handleFunction={this.searchTags} viewPublicDecks={this.showMyDecks} />
					</div>
					<main id="deck-list">
						<section className="row deck-list__add-deck-container" style={{marginBottom: "50px"}}>
							<Card className="deck-list__card">
								<Button color="warning" onClick={this.toggle}>
									<i className="fas fa-plus" /> Add Deck
								</Button>
							</Card>
						</section>

						{/* //=================== Render Decks ==================// */}

						<Row>{renderDecks}</Row>
					</main>
					<DeckModal
						openCreate={this.state.openCreate}
						toggle={this.toggle}
						getDecks={this.getDecks}
						buttonLabel={this.props.buttonLabel}
						modal={this.props.modal}
						className="deck-create"
					/>
				</main>
			</div>
		);
	}
}

export default ChooseDeck;
