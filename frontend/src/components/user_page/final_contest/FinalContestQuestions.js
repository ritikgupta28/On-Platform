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
		fetch('https://on-platform-api.herokuapp.com/feed/userfinalcontest/questions/' + contestId, {
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
						end: resData.contestEnd
					});
				}
				this.setState({ loading: false });
			})
			.catch(this.catchError);
	}

	onEndTimeChange = (id) => {
		let status;
		fetch('https://on-platform-api.herokuapp.com/feed/allcontests', {
			method: 'POST',
			headers: {
				Authorization: 'Bearer ' + this.props.token,
				'Content-Type': 'application/json'
      },
      body: JSON.stringify({
       	contestId: this.props.match.params.id
      })
    })
    .then(res => {
     	status = res.status;
     	return res.json();
    })
    .then(resData => {
     	if(status === 500) {
     		throw new Error(resData.message);
     	}
     	else {
     		this.setState({ end: true });
     		this.props.history.push('/user/finalcontest');
     	}
    })
    .catch(this.catchError);
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
					<span> Contest Over </span> 
					</div>
					: 
					<Time onTimeChange={this.onEndTimeChange} id={this.props.match.params.id} startEnd={this.state.end} date={this.state.date} time={this.state.time} />
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