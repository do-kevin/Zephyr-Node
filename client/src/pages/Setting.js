import React from 'react';
import moment from 'moment-timezone';
import axios from 'axios';
import { Button, Form, FormGroup, Label, Input, Container, Col } from 'reactstrap';
import styled from 'styled-components';

import Sidebar from '../components/Sidebar';

import '../css/Settings.scss';

let phoneNumber = '1(858) 264-3579';

const Menu = styled.menu`
	#sidebar {
		top: 0;
	}
	.sidebar-nav__link--settings {
		background: white;
		box-shadow: 0px 2px 1px #888, 0px -2px 1px #888;
	}
	.sidebar-nav__link--settings .sidebar-nav__text {
		color: black;
	}
`;

class Setting extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			date: new Date(),
			phoneNumberSaved: false,
			phone: '',
			currentPhone: '',
			username: '',
			userId: null,
			saved: false
		};
	}

	componentDidMount() {
		console.log('start');
		try {
			const userId = JSON.parse(localStorage.getItem('user')).id,
				redirect = !userId;
			if (userId) {
				this.setState(
					() => ({ userId, redirect }),
					() => {
						this.getUserInfo();
					}
				);
			}
		} catch (err) {
			console.log(err);
		}
	}

	getUserInfo = () => {
		axios.get('/user/' + this.state.userId).then((data) => {
			console.log(data);
			if (data.data[0].phoneNumber !== null) {
				this.setState({
					phoneNumberSaved: true,
					phone: data.data[0].phoneNumber,
					currentPhone: data.data[0].phoneNumber
				});
			}
			this.setState({
				username: data.data[0].username
			});
		});
	};

	handlePhoneChange = (event) => {
		console.log(event.target.value.replace(/\D/g, ''));
		this.setState({
			currentPhone: event.target.value,
			saved: false
		});
	};

	//saves any edits done to the selected event
	saveChanges = () => {
		if (this.state.phone !== this.state.currentPhone && this.state.currentPhone.replace(/\D/g, '') !== '') {
			let phoneObj = {
				phoneNumber: this.state.currentPhone.replace(/\D/g, '')
			};
			axios.put('/users/' + this.state.userId, phoneObj).then((data) => {
				let eventDate = moment(Date.now()).add(1, 'minutes').format('YYYY-MM-DD HH:mm');
				let newObj = {
					date: eventDate,
					notification: 0,
					message: 'You will be receiving text alerts to this number. Text STOP to unsubscribe.',
					type: 'initial text',
					userId: this.state.userId
				};
				axios.post('/appointment', newObj).then((data) => {
					// console.log("phone number set - " + data);
					this.setState({
						saved: true
					});
				});
			});
		}
	};

	render() {
		let notification;
		if (this.state.saved) {
			notification = (
				<div>
					<p style={{ color: 'limeGreen', marginTop: '30px' }}>Changes have been saved</p>
				</div>
			);
		}

		return (
			<div>
				{/* Logout Redirection */}
				{this.props.handleUserRedirect()}

				<Menu>
					<Sidebar handleUserLogout={this.props.handleUserLogout} />
				</Menu>

				<div className="container" style={{ border: '1px solid blue' }}>
					<h1>Account Settings</h1>
					<hr />
					<div className="settings-content">
						<Form>
							<Container>
								<FormGroup>
									<main className="settings-content__username">
										<Col>
											<aside className="settings-content__username__info">
												<h6 className="settings-content__heading">Profile</h6>
												<p>
													The username you registered for this account; it cannot be changed.
												</p>
											</aside>
										</Col>
										<Col>
											<section className="settings-content__username__form">
												<Label for="username">Username</Label>
												<Input
													type="text"
													id="username"
													value={this.state.username}
													disabled
													//   onChange={this.handleSubjectChange}
												/>
											</section>
										</Col>
										<hr />
									</main>
								</FormGroup>
							</Container>
							<Container>
								<FormGroup>
									<main className="settings-content__phonenumber">
										<Col>
											<aside className="settings-content__phonenumber__info">
												<h6 className="settings-content__heading">
													Adding/Changing Your Phone Number
												</h6>
												<section className="settings-content__phonenumber__warning">
													<p>
														If you do not get a text message after saving your phone number,
														your number may have previously opted out from the service.
														<br />
														<br />
														Please re-subscribe by sending the text message&nbsp;
														<span
															style={{
																background: 'rgb(220,220,220)',
																padding: '2.5px',
																borderRadius: '5px'
															}}
														>
															START
														</span>{' '}
														to <strong>{phoneNumber}</strong>.
													</p>
												</section>
											</aside>
										</Col>
										<Col>
											<section className="settings-content__phonenumber__form">
												<Label for="phone">Phone number</Label>
												<Input
													type="text"
                          id="phone"
                          style={{marginBottom: "10px"}}
													value={this.state.currentPhone}
													onChange={this.handlePhoneChange}
													placeholder="Ex: (555) 555-0100"
												/>
												<Button color="primary" onClick={this.saveChanges}>
													Save your phone number
												</Button>
											</section>
										</Col>
									</main>
								</FormGroup>
							</Container>
						</Form>
						{notification}
					</div>
				</div>
			</div>
		);
	}
}

export default Setting;
