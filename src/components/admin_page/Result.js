import React from 'react'

export default class Result extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			participants: []
		}
	};

	componentDidMount() {
    const contestId = this.props.match.params.id;
		fetch('http://localhost:8000/feed/result/' + contestId, {
			headers: {
				Authorization: 'Bearer ' + this.props.token,
				'Content-Type': 'application/json'
			}
		})
		.then(res => res.json())
		.then(resData=> {
			this.setState({
				participants: resData.participants
			});
		})
		.catch(err => console.log(err));
	}

	render() {
		return (
			<div>
				{
					this.state.participants.map(user => (
					<div key={user.userId} style={{ display: 'flex'}}>
						<p>{user.userId}</p>
						<p style={{paddingLeft: '20px'}}>{user.totalScore}</p>
					</div>
				    ))
				}
			</div>
		)
	}
}