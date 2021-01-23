import React from 'react';
import { Container, Button, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import Time from '../../Time';

export default class CardContest extends React.Component {
	render() {
		return (
			<Container style={{ padding: '10px 50px', fontSize: '20px', border: '1px solid black'}}>
				<Row>
			  		<Col xs='2'>
			  			{this.props.start ? <Link to={`/finalcontest/questions/${this.props.id}`}> <p>{this.props.title}</p> </Link> : <p>{this.props.title}</p> }
					</Col>
					<Col xs='8'>
						{this.props.start ? <span> 00:00:00 </span> : <Time onTimeChange={this.props.onTimeChange} date={this.props.date} time={this.props.time} />}
					</Col>
					<Col xs='2'>
						<Button value={this.props.id} onClick={this.props.handle}>{this.props.sign}</Button>
					</Col>
				</Row>
			</Container>
		)
	}
}