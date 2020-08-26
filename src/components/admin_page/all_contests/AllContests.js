import React, { Component } from 'react'
import { Spinner } from 'react-bootstrap'
import AllContestsCard from './AllContestsCard'
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

  catchError = error => {
    this.setState({ error: error })
  }
  errorHandler = () => {
    this.setState({ error: null });
  };

		componentDidMount() {
		setTimeout(() => {
			fetch('http://localhost:8000/feed/allcontests', {
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
		.then(resData => {
			this.setState({
				allcontest: resData.allcontest,
				loading: false
			});
		})
		.catch(this.catchError)
    }, 3000);
	}

	render() {
		return (
			<div>
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
			{
					this.state.allcontest.map(contest => (
					<AllContestsCard
						sign={'Result'}
						key={contest._id}
						title={contest.contestName}
						id={contest._id}
						questions={contest.questions}
					/>
				  ))
				}
			</div>
		)
	}
}

export default AllContests;
