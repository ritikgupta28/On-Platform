import React, { Component, Fragment } from 'react';
import Card from './FinalContestCard'
import ErrorHandler from '../../error_handler/ErrorHandler'
import { Spinner } from 'react-bootstrap'

class FinalContest extends Component {
	constructor(props) {
    	super(props);
    	this.state = {
    		start: false,
    		loading: true,
			finalcontest: [],
			error: null,
			reg: 'Register'
		}
	};

	componentDidMount() {
		let status;
		fetch('http://localhost:8000/feed/userfinalcontest', {
			headers: {
				Authorization: 'Bearer ' + this.props.token,
				'Content-Type': 'application/json'
			}
		})
		.then(res => {
			status = res.status;
			return res.json();
		})
		.then(resData=> {
			if(status !== 200) {
				throw new Error(resData.message);
			}
			this.setState({
				finalcontest: resData.finalcontest,
				loading: false
			});
		})
		.catch(this.catchError);
	};

	onTimeChange = (bool) => {
		this.setState({ start: bool })
	}

	catchError = error => {
		this.setState({ error: error })
	}

	errorHandler = () => {
		this.setState({ error: null });
	};

	onRegChange = (id) => {
		this.setState({ reg: 'Registration completed' })
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
				{this.state.finalcontest.map(contest => (
					<Card
					  reg={this.state.reg}
					  onRegChange={this.onRegChange}
						start={this.state.start}
						date={contest.contestStartDate}
						time={contest.contestStartTime}
						onTimeChange={this.onTimeChange}
						key={contest._id}
						title={contest.contestName}
						id={contest._id}
						questions={contest.questions}
						admin={contest.admin.name}
					/>
				))}
			</Fragment>
		)
	}
}

export default FinalContest;
