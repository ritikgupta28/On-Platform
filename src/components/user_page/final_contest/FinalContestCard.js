import React from 'react';
import { Link } from 'react-router-dom';

export default class FinalContestCard extends React.Component {
	render() {
		return (
			<div className='quescard'>
				<Link to={`/finalcontest/questions/${this.props.id}`}>
					<p>{this.props.id}</p>
				</Link>
			</div>
		)
	}
}