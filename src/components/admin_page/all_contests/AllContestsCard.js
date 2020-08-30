import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Button, Row, Col } from 'react-bootstrap';

export default class AllContestsCard extends React.Component {
	render() {
		return (
			<Container style={{ padding: '10px 50px', fontSize: '20px', border: '1px solid black'}}>
				<Row>
					<Col xs='10'>
						<Link to={`/allcontests/questions/${this.props.id}`}>
							<p>{this.props.title}</p>
						</Link>
					</Col>
					<Col xs='2'> 
						<Link to={`/result/${this.props.id}`}>
							<Button value={this.props.id}>{this.props.sign}</Button> 
						</Link>
					</Col>
				</Row>
			</Container>
		)
	}
}
