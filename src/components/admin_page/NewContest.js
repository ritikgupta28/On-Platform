import React, { Component, Fragment } from 'react';
import { Container, Form, Button, Spinner, Row, Col } from 'react-bootstrap';

import ErrorHandler from '../error_handler/ErrorHandler';
import Card from './QuestionCard';

class Contest extends Component {
	constructor(props) {
		super(props);
		this.state = {
			loading: true,
			questions: [],
			cName: '',
			csdate: '',
			cstime: '',
			cedate: '',
			cetime: '',
			error: null
		};
		this.handling = this.handling.bind(this);
	}

	componentDidMount() {
		let status;
		fetch('https://agile-lowlands-72745.herokuapp.com/feed/newcontest', {
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
		let status;
		fetch('https://agile-lowlands-72745.herokuapp.com/feed/newcontest-delete-question', {
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
			status=res.status;
			return res.json(); 
		})
		.then(resData => {
			if(status !== 200) {
				throw new Error(resData.message);
			}
		})
		.catch(this.catchError);
	}

	handler = (e) => {
		let status;
		fetch('https://agile-lowlands-72745.herokuapp.com/feed/finalcontest', {
			method: 'POST',
			headers: {
				Authorization: 'Bearer ' + this.props.token,
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				cName: this.state.cName,
				csdate: this.state.csdate,
				cstime: this.state.cstime,
				cedate: this.state.cedate,
				cetime: this.state.cetime
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

	handling(event) {
		const target = event.target ;
		const value = target.value ;
		const name = target.name ;
		this.setState ({
			[name] : value
		});
	}

	render() {
		return (
			<Fragment>
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
				{this.state.questions.map(q => (
					<Card
						value="Remove"
						sign={'-'}
						handle={this.handle}
						key={q.questionId._id}
						id={q.questionId._id}
						title={q.questionId.title}
					/>
				))}
				<Container>
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
						<Row>
							<Col>
								<Form.Group controlId="exampleForm.ControlTextarea1">
									<Form.Label>Start Date</Form.Label>
									<Form.Control
										placeholder="YYYY-MM-DD"
										name="csdate"
										as="textarea" 
										rows="1"
										value={this.state.csdate}
										onChange={this.handling}
									/>
								</Form.Group>
							</Col>
							<Col>
								<Form.Group controlId="exampleForm.ControlTextarea1">
									<Form.Label>Start Time</Form.Label>
									<Form.Control
										placeholder="HH-MM"
										name="cstime"
										as="textarea"
										rows="1"
										value={this.state.cstime}
										onChange={this.handling}
									/>
								</Form.Group>
							</Col>
						</Row>
						<Row>
							<Col>
								<Form.Group controlId="exampleForm.ControlTextarea1">
									<Form.Label>End Date</Form.Label>
									<Form.Control
										placeholder="YYYY-MM-DD"
										name="cedate"
										as="textarea" 
										rows="1"
										value={this.state.cedate}
										onChange={this.handling}
									/>
								</Form.Group>
							</Col>
							<Col>
								<Form.Group controlId="exampleForm.ControlTextarea1">
									<Form.Label>End Time</Form.Label>
									<Form.Control
										placeholder="HH-MM"
										name="cetime"
										as="textarea"
										rows="1"
										value={this.state.cetime}
										onChange={this.handling}
									/>
								</Form.Group>
							</Col>
						</Row>
						<Form.Group style={{ textAlign: 'center', marginTop: '10px' }}>
							<Button onClick={this.handler}>Host</Button>
						</Form.Group>
					</Form>
				</Container>
			</Fragment>
		)
	}
}

export default Contest;
