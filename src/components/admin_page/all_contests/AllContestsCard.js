import React from 'react';
import { Link } from 'react-router-dom';
import { Container } from 'react-bootstrap';

export default class AllContestsCard extends React.Component {
	render() {
		return (
			<Container style={{ fontSize: '20px', textAlign: 'center', border: '1px solid black'}}>
			<div className='questioncard'>
				<Link to={`/allcontests/questions/${this.props.id}`}>
					<p>{this.props.id}</p>
				</Link>
				<Link to={`/result/${this.props.id}`}>
					<button value={this.props.id}>{this.props.sign}</button> 
				</Link>
			</div>
			</Container>
		)
	}
}
