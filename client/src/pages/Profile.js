import React from 'react';
import { Link } from 'react-router-dom';
import {
	Card,
	CardBody,
	Jumbotron,
	Container,
	Row,
	Col,
	Button,
	ListGroup,
	ListGroupItem
} from 'reactstrap';
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
		background: hsl(211, 100%, 97%);
		box-shadow: 0px 2px 1px #888, 0px -2px 1px #888;
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
				<ListGroup className="todo-listgroup">
					<div>
						{this.state.reminders.map((reminder) => {
							var date = moment(reminder.date).format('ddd, MMMM Do YYYY, h:mm:ss a');
							return (
								<ListGroupItem className="small_font animated flipInX" key={reminder.id}>
									<span style={{ color: '#17A2B8' }}>{date}</span>
									<h6>{reminder.item}</h6>
									<p>{reminder.note}</p>
								</ListGroupItem>
							);
						})}
					</div>
				</ListGroup>
			);
		} else {
			renderReminders = (
				<ListGroup className="todo-listgroup animated flipInX">
					<ListGroupItem className="small_font centerText animated fadeIn">No important dates.</ListGroupItem>
				</ListGroup>
			);
		}

		// -------------- Render To-Do List --------------
		if (this.state.todos.length > 0) {
			renderToDos = (
				<ListGroup className="todo-listgroup">
					<div>
						{this.state.todos.map((todo) => {
							return (
								<ListGroupItem 
									className="animated flipInX todo-list__item" 
									key={todo.id}
									style={{borderRadius: "5px"}}>
									{todo.item}
								</ListGroupItem>
							);
						})}
					</div>
				</ListGroup>
			);
		} else {
			renderToDos = (
				<ListGroup className="todo-listgroup">
					<ListGroupItem className="animated flipInX todo-list__item" style={{borderRadius: "5px"}}>
						All tasks completed.
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
					{/* </Row> */}
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
						<ListGroupItem className="small_font noDisplay">No decks to display.</ListGroupItem>
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
						<ListGroupItem className="noDisplay">No notes to display.</ListGroupItem>
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
								<Jumbotron className="profile__banner animated fadeIn">
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
							<h2 style={{    
								top: "25px",
								position: "relative"
							}}>Reminders</h2>
                            <section className="page-block__reminders page-block--default">
                                {renderReminders}
                                <Link to="/reminder">
                                    <Button className="profile-btns" color="info">
                                        View Reminders
                                    </Button>
                                </Link>
                            </section>
							<h2 style={{
								top: "25px",
								position: "relative"
							}}>To-Dos</h2>
                            <section className="page-block__todos page-block--default">
                                {renderToDos}
                                <Link to="/todo">
                                    <Button className="profile-btns" color="info">
                                        View Tasks
                                    </Button>
                                </Link>
                            </section>
                        </div>
						<h2>Recent Decks</h2>
						<section className="page-block page-block--default">
							<Link to="/decks">
								{renderDecks}
								<Button className="profile-btns" color="info">
									View Decks
								</Button>
							</Link>
						</section>
						<h2>Recent Notes</h2>
						<section className="page-block page-block--default">
							{/************** Display existing decks ****************/}
							{renderNotes}
							<Link to="/notes">
								<Button className="profile-btns" color="info">
									View Notes
								</Button>
							</Link>
						</section>
					</Main>
				</Container>
			</main>
		);
	}
}

export default Profile;
