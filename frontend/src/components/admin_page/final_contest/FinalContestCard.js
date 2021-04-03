import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import Time from '../../Time';

export default class CardContest extends React.Component {
	render() {
		return (
			<Container style={{ padding: '10px 50px', fontSize: '20px', border: '1px solid black'}}>
				<Row>
			  	<Col xs='2'>
			  			{this.props.contestStart ? <Link to={`/finalcontest/questions/${this.props.id}`}> <p>{this.props.title}</p> </Link> : <p>{this.props.title}</p> }
					</Col>
					<Col xs='5'>
						{this.props.contestStart ? <span> 00:00:00 </span> : <Time onTimeChange={this.props.onStartTimeChange} id={this.props.id} startEnd={this.props.contestStart} date={this.props.contestStartDate} time={this.props.contestStartTime} />}
					</Col>
					<Col xs='5'>
						{this.props.contestEnd ? <span> Contest Over </span> : <Time onTimeChange={this.props.onEndTimeChange} id={this.props.id} startEnd={this.props.contestEnd} date={this.props.contestEndDate} time={this.props.contestEndTime} />}
					</Col>
				</Row>
			</Container>
		)
	}
}