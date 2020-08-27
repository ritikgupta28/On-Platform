import React, { Component } from 'react';
import { Container, Form, Button, Spinner } from 'react-bootstrap';

import ErrorHandler from '../error_handler/ErrorHandler';
import Card from './QuestionCard';

class Contest extends Component {
	constructor(props) {
		super(props);
		this.state = {
			loading: true,
			questions: [],
			cName: '',
			error: null
		};
	}

	componentDidMount() {
		let status;
		fetch('http://localhost:8000/feed/newcontest', {
				headers: {
					Authorization: 'Bearer ' + this.props.token,
					'Content-Type': 'application/json'
				}
			})
			.then(res => {
				status=res.status;
				return res.json();
			})
			.then(resData => {
				this.setState({ loading: false })
				if(status !== 200) {
				  throw new Error(resData.message);
				}
				else {
				  this.setState({
					  questions: resData.questions
				  });
			  }
			})
			.catch(this.catchError)
	}

	handle = (e) => {
		fetch('http://localhost:8000/feed/newcontest-delete-question', {
			method: 'POST',
			headers: {
				Authorization: 'Bearer ' + this.props.token,
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				questionId: e.target.value
			})
		})
		.then(res => {
			return res.json();
		})
		.then(resData => {
			throw new Error(resData.message);
		})
		.catch(this.catchError);
	}

	handler = (e) => {
		let status;
		e.preventDefault();
		fetch('http://localhost:8000/feed/finalcontest', {
			method: 'POST',
			headers: {
				Authorization: 'Bearer ' + this.props.token,
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				cName: this.state.cName
			})
		})
		.then(res => {
			status=res.status;
			return res.json();
		})
		.then(resData => {
		  if(status === 200) {
		  	this.props.history.push('/admin/finalcontest')
		  }
		  else {
		  	throw new Error(resData.message)
		  }
		})
		.catch(this.catchError);
	}

	catchError = (error) => {
		this.setState({ error: error })
	}

	errorHandler = () => {
		this.setState({ error: null });
	}

	handling = (e) => {
		this.setState({ cName: e.target.value })
	}

	render() {
		return (
			<Container style={{ padding: '10px 50px' }}>
				{this.state.loading && (
					<div style={{ textAlign: 'center', marginTop: '2rem' }}>
						<Spinner
							size='lg'
							variant="primary"
							animation="border"
							role="status"
						/>
					</div>
				)}
				<ErrorHandler error={this.state.error} onHandle={this.errorHandler} />
				<Form>
					<Form.Group controlId="exampleForm.ControlTextarea1">
						<Form.Label>Contest Name</Form.Label>
						<Form.Control 
							placeholder="Contest Name"
							as="textarea" 
							rows="1" 
							value={this.state.cName}
							onChange={this.handling.bind(this)}
						/>
					</Form.Group>
				</Form>
				{
					this.state.questions.map(q => (
						<Card
							value="Remove"
							sign={'-'}
							handle={this.handle}
							key={q.questionId._id}
							id={q.questionId._id}
							title={q.questionId.title}
						/>
					))
				}
				<Form>
					<Form.Group style={{ textAlign: 'center', marginTop: '10px' }}>
						<Button onClick={this.handler}>Host</Button>
					</Form.Group>
				</Form>
			</Container>
		)
	}
}

export default Contest;
