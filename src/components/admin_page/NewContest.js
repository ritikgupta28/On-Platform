import React, { Component } from 'react';
import { Container, Form, Button, Spinner } from 'react-bootstrap';

import ErrorHandler from '../error_handler/ErrorHandler';
import Card from './QuestionCard';

class Contest extends Component {
	constructor(props) {
		super(props);
		this.state = {
			status: null,
			loading: true,
			questions: [],
			cName: '',
			error: null
		};
	}

	errorHandler = () => {
		this.setState({ error: null });
	};

	componentDidMount() {
		console.log(this.props.token)
		setTimeout(() => {
			fetch('http://localhost:8000/feed/newcontest', {
				headers: {
					Authorization: 'Bearer ' + this.props.token,
					'Content-Type': 'application/json'
				}
			})
			.then(res => {
				return res.json();
			})
			.then(resData => {
				//throw new Error(resData.message);
				this.setState({
					loading: false,
					questions: resData.questions
				});
			})
			.catch(this.catchError)
		}, 1000);
	};

	catchError = (error) => {
		this.setState({ error: error })
	}

	handling = (e) => {
		this.setState({ cName: e.target.value })
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
		e.preventDefault();
		let cstatus = null;
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
			cstatus=res.status;
			return res.json();
		})
		.then(resData => {
		  if(cstatus === 200) {
		  	this.props.history.push('/admin/finalcontest')
		  }
		  else {
		  	throw new Error(resData.message)
		  }
		})
		.catch(this.catchError);
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
