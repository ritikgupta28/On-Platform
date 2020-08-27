import React from 'react';
import { Container, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import '../admin/Admin.css';

export default class CardContest extends React.Component {
	render() {
		return (
			<Container style={{ fontSize: '20px', textAlign: 'center', border: '1px solid black'}}>
			<div className='questioncard'>
				<Link to={`/finalcontest/questions/${this.props.id}`}>
					<p>{this.props.title}</p>
				</Link>
				<Button value={this.props.id} onClick={this.props.handle}>{this.props.sign}</Button> 
			</div>
			</Container>
		)
	}
}
