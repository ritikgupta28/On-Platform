import React from 'react'
import { Container, Form, Button } from 'react-bootstrap'

export default class Contact extends React.Component {
	state = {
		name: '',
		email: '',
		message: ''
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
	onSend = () => {
		console.log(this.state.message)
	}
	render() {
		return (
			<Container style={{ padding: '30px 150px' }}>
			 <h1 style={{ textAlign: 'center' }}>Contact Us</h1>
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
           <Form.Group style={{ textAlign: 'center' }}>
           <Button 
            variant="primary" 
            type="submit"
            onClick={this.onSend}
            >
            Send
           </Button>
           </Form.Group>
           </Form>
			</Container>
		)
	}
}