import React from 'react'
import FinalContestCard from './FinalContestCard'

export default class FinalContest extends React.Component {
	constructor(props) {
    super(props);
    this.state = {
			finalcontest: []
		}
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
    .then(response => response.json())
    .catch(err => console.log(err));
	}

	componentDidMount() {
		fetch('http://localhost:8000/feed/finalcontest', {
			headers: {
        Authorization: 'Bearer ' + this.props.token,
				'Content-Type': 'application/json'
      }
    })
			.then(res => res.json())
			.then(resData=> {
				this.setState({
					finalcontest: resData.finalcontest
				});
			})
			.catch(err => console.log(err));
	};

	render() {
		return (
			<div className='pcon'>
				{
					this.state.finalcontest.map(contest => (
					<FinalContestCard
						sign={'End Contest'}
						handle={this.handler}
						key={contest._id}
						title={contest._id}
						id={contest._id}
						questions={contest.questions}
						admin={contest.admin.name}
					/>
				    ))
				}
			</div>
		)
	}
}