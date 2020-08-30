import React, { Component, Fragment } from 'react';
import Card from './QuestionCard';
import { Spinner } from 'react-bootstrap'
import Pagination from '../pagination/Pagination'
import ErrorHandler from '../error_handler/ErrorHandler'

class AllQuestions extends Component {
	state = {
		questions: [],
		loading: true,
		totalQuestions: 0,
		questionPage: 1,
		error: null
	}

	componentDidMount() {
		let status;
		fetch('http://localhost:8000/feed/questions', {
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
			this.setState({ loading: false });
			if(status !== 200) {
				throw new Error(resData.message);
			}
		})
		.catch(this.catchError);

		this.loadQuestions();
	};

	loadQuestions = direction => {
		let status;
		if (direction) {
			this.setState({ questionsLoading: true, questions: [] });
		}
		let page = this.state.questionPage;
		if (direction === 'next') {
			page++;
			this.setState({ questionPage: page });
		}
		if (direction === 'previous') {
			page--;
			this.setState({ questionPage: page });
		}

		fetch('http://localhost:8000/feed/questions?page=' + page , {
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
			this.setState({ loading: false });
			if(status !== 200) {
				throw new Error(resData.message);
			}
			this.setState({
					questions: resData.questions,
					totalQuestions: resData.totalQuestions
				});
		 })
		 .catch(this.catchError);
	};

	handle = (e) => {
		let status;
		fetch('http://localhost:8000/feed/newcontest', {
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
			return res.json()
		})
		.then(resData => {
			if(status === 200) {
				this.props.history.push('/admin/newcontest');
			}  
			else {
				throw new Error(resData.message)
			}
		})
		.catch(this.catchError);
	}

	catchError = error => {
		this.setState({ error: error, questionsLoading: false })
	} 

	errorHandler = () => {
		this.setState({ error: null });
	};

	render() {
		return (
		<Fragment>
			<ErrorHandler error={this.state.error} onHandle={this.errorHandler} />
			{this.state.questionsLoading && (
				<div style={{ textAlign: 'center', marginTop: '2rem' }}>
					<Spinner 
						size='lg'
						variant="primary"
						animation="border" 
						role="status"
					/>
		 		</div>
			)}
			{!this.state.questionsLoading && (
				<Pagination
					onPrevious={this.loadQuestions.bind(this, 'previous')}
					onNext={this.loadQuestions.bind(this, 'next')}
					lastPage={Math.ceil(this.state.totalQuestions / 2)}
					currentPage={this.state.questionPage}
				>
				{this.state.questions.map(q => (
					<Card
						value="Add to Contest"
						sign={'+'}
						hoverText={'Add to Contest'}
						handle={this.handle}
						key={q._id}
						id={q._id}
						title={q.title}
					/>
				))}
		 		<br/>
		 		</Pagination>
		 	)}
		 </Fragment>
		)
	}
}

export default AllQuestions;
