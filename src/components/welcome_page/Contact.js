import React from 'react'
import { Container, Form, Button } from 'react-bootstrap'
import ErrorHandler from '../error_handler/ErrorHandler'

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
		fetch('http://localhost:8000/sendMessage', {
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
			<Container style={{ padding: '30px 150px' }}>
      <ErrorHandler error={this.state.error} onHandle={this.errorHandler} />
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
           <Form.Text className="text-muted">
             We'll touch with you shortly.
            </Form.Text>
           <Form.Group style={{ textAlign: 'center' }}>
           <Button 
            variant="primary" 
            type="submit"
            onClick={this.handler.bind(this)}
            >
            Send
           </Button>
           </Form.Group>
           </Form>
			</Container>
		)
	}
}