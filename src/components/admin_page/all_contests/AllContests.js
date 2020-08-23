import React, { Component, Fragment } from 'react'

import AllContestsCard from './AllContestsCard'
import ErrorHandler from '../../error_handler/ErrorHandler'

class AllContests extends Component {
	constructor(props) {
		super(props);
		this.state = {
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
				allcontest: resData.allcontest
			});
		})
		.catch(this.catchError);
	};

	render() {
		return (
			<Fragment>
			<ErrorHandler error={this.state.error} onHandle={this.errorHandler} />
			{
					this.state.allcontest.map(contest => (
					<AllContestsCard
						sign={'Result'}
						key={contest._id}
						title={contest._id}
						id={contest._id}
						questions={contest.questions}
					/>
				    ))
				}
			</Fragment>
		)
	}
}

export default AllContests;
