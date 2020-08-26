import React, { Component, Fragment } from 'react';
import FinalContestCard from './FinalContestCard'
import ErrorHandler from '../../error_handler/ErrorHandler'

class FinalContest extends Component {
	constructor(props) {
    super(props);
    this.state = {
			finalcontest: [],
			error: null
		}
	};

	catchError = error => {
		this.setState({ error: error })
	}

	errorHandler = () => {
		this.setState({ error: null });
	};

	componentDidMount() {
		setTimeout(() => {
		fetch('http://localhost:8000/feed/userfinalcontest', {
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
				finalcontest: resData.finalcontest
			});
		})
		.catch(this.catchError);
	}, 3000);
	};

	render() {
		return (
			<Fragment>
				<ErrorHandler error={this.state.error} onHandle={this.errorHandler} />
				{
					this.state.finalcontest.map(contest => (
					<FinalContestCard
						key={contest._id}
						title={contest.contestName}
						id={contest._id}
						questions={contest.questions}
						admin={contest.admin.name}
					/>
				    ))
				}
			</Fragment>
		)
	}
}

export default FinalContest;
