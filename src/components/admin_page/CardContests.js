import React from 'react';
import { Link } from 'react-router-dom';

export default class CardContest extends React.Component {
	render() {
		return (
			<div className='quescard'>
				<Link to={`/contest/${this.props.id}`}>
					<p>{this.props.id}</p>
				</Link>
				<Link to="/ide">
					<button className='but'> {this.props.sign} </button> 
				</Link>
			</div>
		)
	}
}