import React from 'react'
import FinalContestCard from './FinalContestCard'

export default class FinalContest extends React.Component {
	constructor(props) {
    super(props);
    this.state = {
			finalcontest: []
		}
	};

	componentDidMount() {
		fetch('http://localhost:8000/feed/finalcontest', {
			headers: {
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
				{this.state.finalcontest.map(contest => (
					<FinalContestCard
						key={contest._id}
						title={contest._id}
						id={contest._id}
						questions={contest.questions}
						admin={contest.admin.name}
					/>
				))}
			</div>
		)
	}
}