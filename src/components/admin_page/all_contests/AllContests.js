import React from 'react'
import AllContestsCard from './AllContestsCard'

export default class AllContests extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			allcontest: []
		}
	};

	componentDidMount() {
		fetch('http://localhost:8000/feed/allcontests', {
			headers: {
				Authorization: 'Bearer ' + this.props.token,
				'Content-Type': 'application/json'
			}
		})
		.then(res => res.json())
		.then(resData => {
			this.setState({
				allcontest: resData.allcontest
			});
		})
		.catch(err => console.log(err));
	};

	render() {
		return (
			<div className='pcon'>
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
			</div>
		)
	}
}