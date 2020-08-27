import React from 'react'
import { Link } from 'react-router-dom';
import { Container } from 'react-bootstrap';

export default class Card extends React.Component {
	render() {
		return (
			<Container style={{ fontSize: '20px', paddingLeft: '20px', border: '1px solid black'}}>
				<Link to={this.props.path} >
					<p>{this.props.title}</p>
				</Link>
			</Container>
		)
	}
}