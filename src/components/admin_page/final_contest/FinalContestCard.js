import React from 'react';
import { Container, Button, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import '../admin/Admin.css';
import Time from './Time';

export default class CardContest extends React.Component {
	render() {
		return (
			<Container style={{ fontSize: '20px', padding: '8px', border: '1px solid black'}}>
				<Row>
			  		<Col xs='2'>
						<Link to={`/finalcontest/questions/${this.props.id}`}>
							<p>{this.props.title}</p>
						</Link>
					</Col>
					<Col xs='8'>
						<Time onTimeChange={this.props.onTimeChange}/>
					</Col>
					<Col xs='2'>
						<Button value={this.props.id} onClick={this.props.handle}>{this.props.sign}</Button>
					</Col>
				</Row>
			</Container>
		)
	}
}
