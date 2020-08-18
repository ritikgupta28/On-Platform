import React from 'react'

export default class Result extends React.Component {
	state = {
		users: ''
	}
	componentDidMount() {
		fetch('http://localhost:8000/')
	}
	render() {
		return (
			<div>
			{
				this.state.users.map(user => (
					{user._id}
					{user.totalScore}
				))
			}
			</div>
		)
	}
}