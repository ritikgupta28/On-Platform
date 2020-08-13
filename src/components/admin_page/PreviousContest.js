import React from 'react'
import PCardContests from './PCardContests'

export default class PreviosContest extends React.Component {
	constructor(props) {
    super(props);
    this.state = {
			allcontest: []
		}
	};

	componentDidMount() {
		fetch('http://localhost:8000/feed/allcontest', {
			headers: {
				Authorization: 'Bearer ' + this.props.token,
				'Content-Type': 'application/json'
      }
    })
			.then(res => res.json())
			.then(resData=> {
				this.setState({
					allcontest: resData.allcontest
				});
			})
			.catch(err => console.log(err));
	};

	render() {
		return (
			<div className='pcon'>
				<h1>All Contests</h1>
				<hr />
				{this.state.allcontest.map(contest => ( 
					<PCardContests
						sign={'Host'}
						key={contest._id}
						title={contest._id}
						id={contest._id}
						questions={contest.questions}
					/>
				))}
			</div>
		)
	}
}