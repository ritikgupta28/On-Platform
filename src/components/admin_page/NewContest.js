import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Container, Form, Button } from 'react-bootstrap';

import ErrorHandler from '../error_handler/ErrorHandler';
import Card from './QuestionCard';

class Contest extends Component {
	constructor(props) {
		super(props);
		this.state = {
			questions: [],
			cName: "",
			error: null
		};
		this.handling = this.handling.bind(this);
	}

	handling(event) {
		const target = event.target ;
		const value = target.value ;
		const name = target.name ;
		this.setState ({
			[name] : value
		});
	}

	catchError = error => {
		this.setState({ error: error })
	}

	errorHandler = () => {
		this.setState({ error: null });
	};

	componentDidMount() {
		fetch('http://localhost:8000/feed/newcontest', {
			headers: {
				Authorization: 'Bearer ' + this.props.token,
				'Content-Type': 'application/json'
			}
		})
			.then(res => {
				if (res.status !== 200) {
					throw new Error('error');
				}
				return res.json();
			})
			.then(resData=> {
				this.setState({
					questions: resData.questions,
				});
			})
			.catch(this.catchError);
	};

	catchError = (error) => {
		this.setState({ error: error })
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
				if (res.status !== 200) {
					throw new Error('error');
				}
				return res.json();
			})
		.catch(this.catchError);
	}

	handler = (e) => {
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
				if (res.status !== 200) {
					throw new Error('error');
				}
				return res.json();
			})
		.catch(this.catchError);
	}

	render() {
		return (
			<Container style={{ padding: '10px 50px'}}>
				<ErrorHandler error={this.state.error} onHandle={this.errorHandler} />
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
					<Form.Group controlId="exampleForm.ControlTextarea1">
						<Form.Label>Contest Name</Form.Label>
						<Form.Control 
							placeholder="Contest Name"
							name="cName"
							as="textarea" 
							rows="1" 
							value={this.state.cName}
							onChange={this.handling}
						/>
					</Form.Group>
					<Link to='/admin/finalcontest'>
						<Button className='but' value='s' style={{ marginBottom: '10px' }} onClick={this.handler}>Host</Button>
					</Link>
				</Form>
			</Container>
		)
	}
}

export default Contest;
