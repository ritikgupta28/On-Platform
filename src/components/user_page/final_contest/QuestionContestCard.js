import React from 'react'
import '../user/User.css'
import { Link } from 'react-router-dom';

export default class Card extends React.Component {
	render() {
		return (
			<div className='quescard'>
				<Link to={`/question/${this.props.id}`}>
					<p>{this.props.title}</p>
				</Link>
			</div>
		)
	}
}