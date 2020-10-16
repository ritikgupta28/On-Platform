import React from 'react'
import { Container, Form, Button, Row, Col, Image } from 'react-bootstrap'

import ErrorHandler from '../../error_handler/ErrorHandler'
import svg from '../../svg/contact.svg'
import Header from './ContactHeader'
import Footer from '../Footer'

export default class Contact extends React.Component {
	constructor() {
	super();
	this.state = {
		error: null,
		name: '',
		email: '',
		message: ''
	}
}

	onNameChange = (e) => {
		this.setState({
			name: e.target.value
		})
	}

	onEmailChange = (e) => {
		this.setState({
			email: e.target.value
		})
	}

	onMessageChange = (e) => {
		this.setState({
			message: e.target.value
		})
	}

	handler = (e) => {
		const { name, email, message } = this.state;
		fetch('https://on-platform-api.herokuapp.com/sendMessage', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				name: name,
				email: email,
				message: message
			})
		})
		.then(res => {
				return res.json();
			})
		.catch(err => console.log(err));
	}

	catchError = error => {
		this.setState({ error: error })
	}
	
	errorHandler = () => {
		this.setState({ error: null });
	}

	render() {
		return (
			<div>
				<Header />
				<Container style={{ marginTop: '40px'}}>
					<ErrorHandler error={this.state.error} onHandle={this.errorHandler} />
					<hr />
					<Row>
						<Col>
							<Form>
								<Form.Group controlId="formBasicName">
									<Form.Label>Name</Form.Label>
									<Form.Control
										type='text'
										placeholder="Enter your name"
										as="textarea" 
										rows="1"
										value={this.state.name}
										onChange={this.onNameChange}
									/>
								</Form.Group>
								<Form.Group controlId="formGridEmail">
									<Form.Label>Email</Form.Label>
									<Form.Control
										type="email"
										placeholder="Enter your email"
										as="textarea"
										rows="1"
										value={this.state.email}
										onChange={this.onEmailChange}
									/>
								</Form.Group>
								<Form.Group controlId="exampleForm.ControlTextarea1">
									<Form.Label>Message</Form.Label>
									<Form.Control
										type='text'
										placeholder="Enter your message"
										as="textarea"
										rows="4"
										value={this.state.message}
										onChange={this.onMessageChange}
									/>
								</Form.Group>
								<Form.Text className="text-muted">
									We'll touch with you shortly.
								</Form.Text>
								<Form.Group style={{ textAlign: 'center' }}>
									<Button 
										variant="primary" 
										type="submit"
										onClick={this.handler.bind(this)}
									>
										Send Message
									</Button>
								</Form.Group>
							</Form>
						</Col>
						<Col md="auto">
							<Image style={{ height: '400px'}} src={svg} rounded />
						</Col>
					</Row>
				</Container>
				<div style={{ marginTop: '40px'}}>
					<Footer />
				</div>
			</div>
		)
	}
}