import React from 'react'
import { Container } from 'react-bootstrap'
import { Link } from 'react-router-dom';

import './admin/Admin.css'

export default class Card extends React.Component {
	render() {
		return (
			<Container style={{ fontSize: '20px', textAlign: 'center', border: '1px solid black'}}>
				<div className='questioncard'>
					<Link to={`/question/${this.props.id}`}>
						<p>{this.props.title}</p>
					</Link>
				</div>
			</Container>
		)
	}
}