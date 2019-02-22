import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardBody, Jumbotron, Container, Row, Col, Button, ListGroup, ListGroupItem } from 'reactstrap';
import moment from 'moment';
import axios from 'axios';
import styled from 'styled-components';

import Quote from '../components/Quote';
import Sidebar from '../components/Sidebar';

import '../css/Profile.scss';

const Menu = styled.menu`
	#sidebar {
		top: 0;
	}
	.sidebar-nav__link--profile {
		background: hsla(214, 100%, 96%, 1);
		box-shadow: 0px 2px 1px #888, 0px -2px 1px #888;
		border-left: 5px solid hsla(220, 15%, 23%, 1);
	}
	.sidebar-nav__link--profile .sidebar-nav__text {
		color: black;
	}
`;

const Main = styled.main`
	.col {
		margin-top: 10px;
		margin-bottom: 10px;
	}
`;

class Profile extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			time_date: moment().format('ddd, MMMM Do YYYY'),
			reminders: [],
			todos: [],
			decks: [],
			notes: []
		};
		this.getReminders = this.getReminders.bind(this);
		this.getToDos = this.getToDos.bind(this);
		this.getDecks = this.getDecks.bind(this);
		this.getNotes = this.getNotes.bind(this);
	}

	componentDidMount() {
		// console.log("Profile component mounted.");
		try {
			const userId = JSON.parse(localStorage.getItem('user')).id;
			if (userId) this.setState(() => ({ id: userId }));
		} catch (err) {
			console.log(err.message);
		}
		this.getReminders();
		this.getToDos();
		this.getDecks();
		this.getNotes();
	}

	deckIdSessionStorage = (id) => {
		sessionStorage.setItem('deckId', id);
	};

	// Request data from the database; obtain user id from localStorage

	getReminders = () => {
		let id = JSON.parse(localStorage.getItem('user')).id;
		axios.get('/reminders/users/' + id).then((res) => {
			// console.log(res.data);
			this.setState({
				reminders: res.data
			});
		});
	};

	getToDos = () => {
		let id = JSON.parse(localStorage.getItem('user')).id;
		axios.get('/todos/users/' + id).then((res) => {
			// console.log(res.data);
			this.setState({
				todos: res.data
			});
		});
	};

	getDecks = () => {
		let id = JSON.parse(localStorage.getItem('user')).id;
		axios.get('/decks/users/' + id).then((res) => {
			// console.log(res.data);
			this.setState({
				decks: res.data
			});
		});
	};

	getNotes = () => {
		let id = JSON.parse(localStorage.getItem('user')).id;
		axios.get('/notes/users/' + id).then((res) => {
			// console.log(res.data);
			this.setState({
				notes: res.data
			});
		});
	};

	// Render page

	render() {
		let renderToDos;
		let renderReminders;
		let renderDecks;
		let renderNotes;

		// -------------- Render Reminders --------------
		if (this.state.reminders.length > 0) {
			renderReminders = (
				<div className="scrolldown-cards">
					<ListGroup className="todo-listgroup">
						{this.state.reminders.map((reminder) => {
							var date = moment(reminder.date).format('ddd, MMMM Do, YYYY');
							var time = moment(reminder.date.replace(':00.000Z', '').replace('T', ' ')).format('hh:mma');
							return (
								<ListGroupItem className="profile-reminders animated flipInX" key={reminder.id}>
									<span style={{ color: '#17A2B8', fontWeight: 500 }}>
										{date} at {time}
									</span>
									<h5
										style={{
											textDecoration: 'underline',
											marginBottom: '10px'
										}}
									>
										{reminder.item}
									</h5>
									<p>{reminder.note}</p>
								</ListGroupItem>
							);
						})}
					</ListGroup>
				</div>
			);
		} else {
			renderReminders = (
				<ListGroup className="todo-listgroup animated flipInX">
					<ListGroupItem className="profile-reminders centerText animated fadeIn">
						No important dates
					</ListGroupItem>
				</ListGroup>
			);
		}

		// -------------- Render To-Do List --------------
		if (this.state.todos.length > 0) {
			renderToDos = (
				<div className="scrolldown-cards">
					<ListGroup className="todo-listgroup">
						{this.state.todos.map((todo) => {
							return (
								<ListGroupItem
									className="profile-todos animated flipInX todo-list__item"
									key={todo.id}
									style={{ borderRadius: '5px' }}
								>
									{todo.item}
								</ListGroupItem>
							);
						})}
					</ListGroup>
				</div>
			);
		} else {
			renderToDos = (
				<ListGroup className="todo-listgroup">
					<ListGroupItem className="profile-todos animated flipInX todo-list__item" style={{ borderRadius: '5px', textAlign: 'center' }}>
						All tasks completed
					</ListGroupItem>
				</ListGroup>
			);
		}

		// -------------- Render Decks --------------
		if (this.state.decks.length > 1) {
			renderDecks = (
				<div style={{ display: 'flex', flexWrap: 'wrap' }}>
					{this.state.decks.slice(Math.max(this.state.decks.length - 4, 1)).map((deck) => {
						return (
							<Col key={deck.id}>
								<div className="decks decks-primary animated bounceIn">
									<Link to="/deck" onClick={() => this.deckIdSessionStorage(deck.id)}>
										<div className="container">
											<h1 className="deck-title text-center">{deck.subject}</h1>
										</div>
									</Link>
								</div>
							</Col>
						);
					})}
				</div>
			);
		} else if (this.state.decks.length === 1) {
			renderDecks = (
				<div className="one-deck">
					{this.state.decks.map((deck) => {
						return (
							<Col key={deck.id}>
								<div className="decks decks-primary animated bounceIn">
									<Link to="/deck" onClick={() => this.deckIdSessionStorage(deck.id)}>
										<div className="container">
											<h1 className="deck-title text-center">{deck.subject}</h1>
										</div>
									</Link>
								</div>
							</Col>
						);
					})}
				</div>
			);
		} else {
			renderDecks = (
				<Col>
					<ListGroup>
						<ListGroupItem className="noDisplay">You haven't created any decks</ListGroupItem>
					</ListGroup>
				</Col>
			);
		}

		// -------------- Render Notes --------------
		if (this.state.notes.length > 1) {
			renderNotes = (
				<div>
					{this.state.notes.slice(Math.max(this.state.decks.length - 2, 1)).map((note) => {
						return (
							<section
								key={note.id}
								className="animated zoomInRight note-output"
								style={{ overflowY: 'scroll' }}
							>
								<div
									className="quill-output animated zoomInRight"
									dangerouslySetInnerHTML={{ __html: note.note }}
									style={{ wordBreak: 'break-word' }}
								/>
							</section>
						);
					})}
				</div>
			);
		} else if (this.state.notes.length === 1) {
			renderNotes = (
				<div>
					{this.state.notes.map((note) => {
						return (
							<section
								key={note.id}
								className="animated zoomInRight note-output"
								style={{ overflowY: 'scroll' }}
							>
								<div
									className="quill-output animated zoomInRight"
									dangerouslySetInnerHTML={{ __html: note.note }}
									style={{ wordBreak: 'break-word' }}
								/>
							</section>
						);
					})}
				</div>
			);
		} else {
			renderNotes = (
				<Col>
					<ListGroup>
						<ListGroupItem className="noDisplay">You haven't created any notes</ListGroupItem>
					</ListGroup>
				</Col>
			);
		}

		return (
			<main id="profile">
				{/* Logout redirection */}
				{this.props.handleUserRedirect()}

				<Menu>
					<Sidebar handleUserLogout={this.props.handleUserLogout} />
				</Menu>
				<Container className="text-center">
					<Main>
						<Row>
							<Col>
								<Jumbotron
									className="profile__banner animated fadeIn"
									style={{ backgroundColor: 'transparent' }}
								>
									<Container>
										<h1 className="display-4">
											Hello,{' '}
											<span id="username">{JSON.parse(localStorage.getItem('user')).name}</span>!
										</h1>
										<br />
										<Quote />
										{this.state.time_date}
									</Container>
								</Jumbotron>
							</Col>
						</Row>
						<div id="reminders-todos" className="page-block">
							<section className="page-block__reminders page-block--clear">
								<h2>Reminders</h2>
								{renderReminders}
								<Link to="/reminder">
									<button className="profile-btns">
										View reminders
									</button>
								</Link>
							</section>
							<section className="page-block__todos page-block--clear">
								<h2>To-Dos</h2>
								{renderToDos}
								<Link to="/todo">
									<button className="profile-btns">
										View tasks
									</button>
								</Link>
							</section>
						</div>
						<h2>Recent Decks</h2>
						<section className="page-block page-block--default">
							{renderDecks}
							<Link to="/decks">
								<button className="profile-btns" style={{marginTop: "25px"}}>
									View decks
								</button>
							</Link>
						</section>
						<h2>Recent Notes</h2>
						<section className="page-block page-block--default">
							{/************** Display existing decks ****************/}
							{renderNotes}
							<Link to="/notes">
								<button className="profile-btns" style={{marginTop: "25px"}}>
									View notes
								</button>
							</Link>
						</section>
					</Main>
				</Container>
			</main>
		);
	}
}

export default Profile;
