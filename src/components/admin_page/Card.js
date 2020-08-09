import React from 'react'
import './Admin.css'
import { Link } from 'react-router-dom';

export default class Card extends React.Component {
	render() {
		return (
			<div className='quescard'>
				<Link to={`/question/${this.props.id}`}>
				<p>{this.props.title}</p>
				</Link>
				<Link to="/admin/contest">
				<button className='but' value={this.props.id} onClick={this.props.handle}> {this.props.sign} </button> 
				</Link>
			</div>
		)
	}
}