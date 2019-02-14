import React from 'react';
import { Button, Modal, ModalHeader, ModalBody } from 'reactstrap';
import axios from 'axios';
import styled from 'styled-components';

// CSS
import '../css/Login.scss';

// Login/sign up ready styles
const readyStyles = {
		borderRight: '5px solid limeGreen'
	},
	// Login / sign up NOT ready styles
	notReadyStyles = {
		borderRight: '5px solid red'
	},
	errorStyles = {
		color: 'red'
	};

const Tab = styled.div`
	.modal-body {
		border-bottom-left-radius: 5px;
		border-bottom-right-radius: 5px;
		background: rgb(0, 140, 255) !important;
	}
`;

class Login extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			modal: false,
			login: true,
			create: false,
			name: '',
			username: '',
			password: '',
			passwordCheck: '',
			readyToLogin: false,
			readyToSignUp: false,
			loginError: null
		};
	}

	componentDidUpdate(prevProps, prevState) {
		const namePattern = /^[a-z]{1,20}(\s[a-z]{1,20}){0,5}$/i,
			usernamePattern = /^[a-z1-9_-]{4,24}$/i,
			passwordPattern = /^[^:;,\s]{6,24}$/;
		let readyToLogin, readyToSignUp;
		if (usernamePattern.test(this.state.username.trim()) && passwordPattern.test(this.state.password)) {
			readyToLogin = true;
			if (namePattern.test(this.state.name.trim()) && this.state.password === this.state.passwordCheck) {
				readyToSignUp = true;
			}
		} else {
			readyToLogin = false;
			readyToSignUp = false;
		}
		if (this.state.readyToLogin !== readyToLogin) this.setState(() => ({ readyToLogin }));
		if (this.state.readyToSignUp !== readyToSignUp) this.setState(() => ({ readyToSignUp }));
	}

	toggle = () => {
		if (
			this.state.name === '' &&
			this.state.username === '' &&
			this.state.password === '' &&
			this.state.passwordCheck === ''
		) {
			this.setState((prevState) => ({
				modal: !prevState.modal
			}));
		}
	};

	selectLogin = () => {
		this.setState({
			login: true,
			create: false
		});
	};

	selectCreate = () => {
		this.setState({
			login: false,
			create: true
		});
	};

	handleInputChange = (e) => {
		const { name, value } = e.target;
		this.setState(() => ({
			[name]: value
		}));
	};

	handleInputClear = () => {
		this.setState((prevState) => ({
			name: '',
			username: '',
			password: '',
			passwordCheck: '',
			loginError: null,
			modal: !prevState.modal
		}));
	};

	handleSignUp = (e) => {
		e.preventDefault();
		const user = {
			name: this.state.name.trim(),
			username: this.state.username.trim(),
			password: this.state.password
		};
		axios({
			url: '/users/signUp',
			method: 'POST',
			data: user
		})
			.then((data) => {
				const { data: user } = data;
				this.setState((prevState) => ({
					name: '',
					username: '',
					password: '',
					passwordCheck: '',
					modal: !prevState.modal
				}));
				this.props.handleUserLogin(user);
			})
			.catch((err) => {
				this.setState(() => ({
					loginError: 'Unable to Create, User May Already Exist'
				}));
			});
	};

	handleLogin = (e) => {
		e.preventDefault();
		const user = {
			username: this.state.username,
			password: this.state.password
		};
		axios({
			url: '/users/login',
			method: 'POST',
			data: user
		})
			.then((data) => {
				const { data: user } = data;
				this.setState((prevState) => ({
					username: '',
					password: '',
					loginError: null,
					modal: !prevState.modal
				}));
				this.props.handleUserLogin(user);
			})
			.catch(() => {
				this.setState(() => ({
					loginError: 'Invalid Username and/or Password'
				}));
			});
	};

	render() {
		const namePattern = /^[a-z]{1,20}(\s[a-z]{1,20}){0,5}$/i,
			usernamePattern = /^[a-z1-9_-]{4,24}$/i,
			passwordPattern = /^[^:;,\s]{6,24}$/;

		const login = this.state.login;
		const create = this.state.create;
		let inputBody;

		if (login === true && create === false) {
			inputBody = (
				<Tab>
				<ModalBody selectLogin={this.selectLogin}>
					<form onSubmit={this.handleLogin}>
						<div className="form-group">
							<label htmlFor="username">
								<strong>Username</strong>
							</label>
							<input
								style={usernamePattern.test(this.state.username.trim()) ? readyStyles : notReadyStyles}
								type="text"
								className="form-control animated fadeIn"
								id="username"
								name="username"
								value={this.state.username}
								onChange={this.handleInputChange}
								required
							/>
							<label htmlFor="password">
								<strong>Password</strong>
							</label>
							<input
								style={passwordPattern.test(this.state.password) ? readyStyles : notReadyStyles}
								type="password"
								className="form-control animated fadeIn"
								id="password"
								name="password"
								value={this.state.password}
								onChange={this.handleInputChange}
								required
							/>
							<br />
							<Button
								className="login-btns"
								type="submit"
								color="success"
								disabled={!this.state.readyToLogin}
							>
								Login
							</Button>
						</div>
					</form>
				</ModalBody>
				</Tab>
			);
		} else if (login === false && create === true) {
			inputBody = (
				<Tab>
				<ModalBody selectCreate={this.selectCreate}>
					<form onSubmit={this.handleSignUp}>
						<div className="form-group">
							<label htmlFor="name">
								<strong>Name</strong>
							</label>
							<input
								style={namePattern.test(this.state.name.trim()) ? readyStyles : notReadyStyles}
								type="text"
								className="form-control animated flipInX"
								id="name"
								placeholder="Enter your name"
								name="name"
								value={this.state.name}
								onChange={this.handleInputChange}
								required
							/>
							<label htmlFor="username">
								<strong>Username</strong>
							</label>
							<input
								style={usernamePattern.test(this.state.username.trim()) ? readyStyles : notReadyStyles}
								type="text"
								className="form-control animated flipInX"
								id="username"
								placeholder="Enter your username"
								name="username"
								value={this.state.username}
								onChange={this.handleInputChange}
								required
							/>
							<label htmlFor="password">
								<strong>Password</strong>
							</label>
							<input
								style={
									passwordPattern.test(this.state.password) &&
									this.state.password === this.state.passwordCheck ? (
										readyStyles
									) : (
										notReadyStyles
									)
								}
								type="password"
								className="form-control animated flipInX"
								id="password"
								name="password"
								placeholder="Enter your password"
								value={this.state.password}
								onChange={this.handleInputChange}
								required
							/>
							<label htmlFor="password">
								<strong>Confirm Password</strong>
							</label>
							<input
								style={
									this.state.password === this.state.passwordCheck &&
									this.state.passwordCheck.length > 0 ? (
										readyStyles
									) : (
										notReadyStyles
									)
								}
								type="password"
								className="form-control animated flipInX"
								id="passwordCheck"
								name="passwordCheck"
								placeholder="Re-enter your password"
								value={this.state.passwordCheck}
								onChange={this.handleInputChange}
								required
							/>
							<br />
							<Button
								className="login-btns"
								type="submit"
								color="success"
								onClick={this.toggle}
								disabled={!this.state.readyToSignUp}
							>
								Create
							</Button>
						</div>
					</form>
				</ModalBody>
				</Tab>
			);
		}

		return (
			<main>
				<Button color="primary" onClick={this.toggle}>
					{this.props.buttonLabel}
					Login <i className="fas fa-sign-in-alt" />
				</Button>
					<Modal
						isOpen={this.state.modal}
						toggle={this.toggle}
						className={this.props.className && "custom-modal"}
						id="login-modal"
					>
						<ModalHeader toggle={this.handleInputClear} style={errorStyles}>
							{this.state.loginError}
						</ModalHeader>
						<section className="row">
							<div className="col">
								<Button
									color="light"
									style={{ outline: 'none' }}
									className="login-or-create-btn"
									size="lg"
									block
									onClick={this.selectLogin}
									active={this.state.login}
								>
									Sign In
								</Button>
							</div>
							<div className="col">
								<Button
									color="light"
									style={{ outline: 'none' }}
									className="login-or-create-btn"
									size="lg"
									block
									onClick={this.selectCreate}
									active={this.state.create}
								>
									Sign Up
								</Button>
							</div>
						</section>
            {inputBody}
					</Modal>
			</main>
		);
	}
}

export default Login;
