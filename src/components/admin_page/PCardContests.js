import React from 'react';
import { Link } from 'react-router-dom';

export default class CardContest extends React.Component {
	render() {
		return (
			<div className='quescard'>
				<Link to={`/previouscontest/${this.props.id}`}>
					<p>{this.props.id}</p>
				</Link>
				<Link to="/admin/questions">
					<button className='but' value={this.props.id} onClick={this.props.handle}> {this.props.sign} </button> 
				</Link>
			</div>
		)
	}
}