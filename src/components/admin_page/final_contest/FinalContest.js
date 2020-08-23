import React, { Component, Fragment } from 'react'

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

	handler = (e) => {
		fetch('http://localhost:8000/feed/allcontests', {
      method: 'POST',
      headers: {
        Authorization: 'Bearer ' + this.props.token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        contestId: e.target.value
      })
    })
    .then(res => {
        if (res.status !== 200) {
          throw new Error('error');
        }
        return res.json();
      })
    .catch(this.catchError);
	}

	componentDidMount() {
		fetch('http://localhost:8000/feed/finalcontest', {
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
				console.log(resData);
				this.setState({
					finalcontest: resData.finalcontest
				});
			})
			.catch(this.catchError);
	};

	render() {
		return (
			<Fragment>
			   <ErrorHandler error={this.state.error} onHandle={this.errorHandler} />
				{
					this.state.finalcontest.map(contest => (
					<FinalContestCard
						sign={'End'}
						handle={this.handler}
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
