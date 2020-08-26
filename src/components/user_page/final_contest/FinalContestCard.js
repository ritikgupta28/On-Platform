import React from 'react';
import { Link } from 'react-router-dom';
import { Container } from 'react-bootstrap';

export default class FinalContestCard extends React.Component {
	render() {
		return (
			<Container style={{ fontSize: '20px', textAlign: 'center', border: '1px solid black' }}>
				<Link to={`/finalcontest/questions/${this.props.id}`}>
					<p>{this.props.title}</p>
				</Link>
			</Container>
		)
	}
}