import React, { Component, Fragment } from 'react'
import { Spinner } from 'react-bootstrap'
import Card from './AllContestsCard'
import ErrorHandler from '../../error_handler/ErrorHandler'

class AllContests extends Component {
	constructor(props) {
		super(props);
		this.state = {
			loading: true,
			allcontest: [],
			error: null
		}
	};

	componentDidMount() {
		  let status;
			fetch('https://on-platform-api.herokuapp.com/feed/allcontests', {
			headers: {
				Authorization: 'Bearer ' + this.props.token,
				'Content-Type': 'application/json'
			}
		})
		.then(res => {
        status = res.status
        return res.json();
      })
		.then(resData => {
			this.setState({ loading: false })
			if(status === 200) {
 			  this.setState({ allcontest: resData.allcontest });
 		  } 
 		  else {
 		  	throw new Error(resData.message);
 		  }
		})
		.catch(this.catchError)
	}

  catchError = error => {
    this.setState({ error: error })
  }
  
  errorHandler = () => {
    this.setState({ error: null });
  };

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
				{!this.state.loading && this.state.allcontest.length === 0 && (
					<h2 style={{ textAlign: 'center' }}>Sorry! no contest is created by you.</h2>
				)}
				{this.state.allcontest.map(contest => (
					<Card
						sign={'Result'}
						key={contest._id}
						title={contest.contestName}
						id={contest._id}
						questions={contest.questions}
					/>
				))}
			</Fragment>
		)
	}
}

export default AllContests;
