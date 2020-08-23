import React from 'react'
import { Container, Button } from 'react-bootstrap'
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
					<Link to="/admin/newcontest">
						<Button value={this.props.id} onClick={this.props.handle}>{this.props.sign}</Button> 
					</Link>
				</div>
			</Container>
		)
	}
}