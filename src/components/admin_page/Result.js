import React from 'react'

export default class Result extends React.Component {
	constructor(props) {
    super(props);
    this.state = {
			participants: []
		}
    };
	componentDidMount() {
		fetch('http://localhost:8000/finalcontest/result', {
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
					{user._id}
					{user.totalScore}
				))
			}
			</div>
		)
	}
}