import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Button } from 'react-bootstrap';

export default class AllContestsCard extends React.Component {
	render() {
		return (
			<Container style={{ fontSize: '20px', textAlign: 'center', border: '1px solid black'}}>
			<div className='questioncard'>
				<Link to={`/allcontests/questions/${this.props.id}`}>
					<p>{this.props.title}</p>
				</Link>
				<Link to={`/result/${this.props.id}`}>
					<Button value={this.props.id}>{this.props.sign}</Button> 
				</Link>
			</div>
			</Container>
		)
	}
}
