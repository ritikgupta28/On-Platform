import React, { Component, Fragment } from 'react';
import { Spinner } from 'react-bootstrap'
import Card from '../../QuestionNameCard';
import ErrorHandler from '../../error_handler/ErrorHandler'
import Time from '../../Time';

class FinalContestQuestions extends Component {
	state = {
		end: false,
		date: '',
		time: '',
		loading: true,
		questions: [],
		error: null
	};

	componentDidMount() {
		let status;
		const contestId = this.props.match.params.id;
		fetch('http://localhost:8000/feed/userfinalcontest/questions/' + contestId, {
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
				if (status !== 200) {
					throw new Error(resData.message);
				}
				else {
					this.setState({
						date: resData.ceDate,
						time: resData.ceTime,
						questions: resData.questions,
					});
				}
				this.setState({ loading: false });
				console.log(resData);
			})
			.catch(this.catchError);
	}

	onTimeChange = (bool) => {
		this.setState({ end: bool })
	}

	catchError = error => {
		this.setState({ error: error })
	}

	errorHandler = () => {
		this.setState({ error: null });
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
				<div style={{ marginBottom: '20px', textAlign: 'right' }}>
				{!this.state.loading && (
					this.state.end 
					? 
					<div>
					{window.location.reload()}
					<span> Contest Over </span> 
					</div>
					: 
					<Time onTimeChange={this.onTimeChange} date={this.state.date} time={this.state.time} />
				)}
				</div>
				{this.state.questions.map(q=> (
					<Card
						sign={'view'}
						key={q.questionId._id}
						id={q.questionId._id}
						title={q.questionId.title}
					/>
				))}
			</Fragment>
		)
	}
}

export default FinalContestQuestions;