import React, { Component, Fragment } from 'react'
import { Spinner } from 'react-bootstrap'
import FinalContestCard from './FinalContestCard'
import ErrorHandler from '../../error_handler/ErrorHandler'

class FinalContest extends Component {
	constructor(props) {
    super(props);
    this.state = {
    	loading: true,
			finalcontest: [],
			error: null
		}
	};

	componentDidMount() {
		let status;
		fetch('https://on-platform-api.herokuapp.com/feed/finalcontest', {
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
			this.setState({ loading: false });
			if(status === 200) {
				this.setState({
					finalcontest: resData.finalcontest
				});
			}
			else {
				throw new Error(resData.message);
			}
		})
		.catch(this.catchError);
	};

	onStartTimeChange = (id) => {
		let status;
		fetch('https://on-platform-api.herokuapp.com/feed/finalcontest/start', {
			method: 'POST',
			headers: {
				Authorization: 'Bearer ' + this.props.token,
				'Content-Type': 'application/json'
      },
      body: JSON.stringify({
       	id: id
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
     		window.location.reload();
     	}
    })
    .catch(this.catchError);
  }

  onEndTimeChange = (id) => {
  	console.log(id);
		let status;
		fetch('https://on-platform-api.herokuapp.com/feed/allcontests', {
			method: 'POST',
			headers: {
				Authorization: 'Bearer ' + this.props.token,
				'Content-Type': 'application/json'
      },
      body: JSON.stringify({
       	contestId: id
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
     		window.location.reload();
     	}
    })
    .catch(this.catchError);
  }

	catchError = (error) => {
    	this.setState({ error: error })
  }

  errorHandler = (bool) => {
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
				{!this.state.loading && this.state.finalcontest.length === 0 && (
					<h1 style={{ textAlign: 'center' }}>No Contest Available !!!</h1>
				)}
				{this.state.finalcontest.map(contest => (
					<FinalContestCard
						contestStart={contest.contestStart}
						contestEnd={contest.contestEnd}
						contestStartDate={contest.contestStartDate}
						contestStartTime={contest.contestStartTime}
						contestEndDate={contest.contestEndDate}
						contestEndTime={contest.contestEndTime}
						onStartTimeChange={this.onStartTimeChange}
						onEndTimeChange={this.onEndTimeChange}
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
