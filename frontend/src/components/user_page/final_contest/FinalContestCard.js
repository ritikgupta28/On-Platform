import React from 'react';
import { Container, Button, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import Time from '../../Time';

export default class CardContest extends React.Component {
	onReg = (e) => {
		this.props.onRegChange(e.target.value);
	}

	render() {
		return (
			<Container style={{ fontSize: '20px', padding: '10px 50px', border: '1px solid black' }}>
				<Row>
			  	<Col xs='1'>
			  			{this.props.contestStart ? <Link to={`/finalcontest/questions/${this.props.id}`}> <p>{this.props.title}</p> </Link> : <p>{this.props.title}</p> }
					</Col>
					<Col xs='5'>
						{this.props.contestStart ? <span> 00:00:00 </span> : <Time onTimeChange={this.props.onStartTimeChange} id={this.props.id} startEnd={this.props.contestStart} date={this.props.contestStartDate} time={this.props.contestStartTime} />}
					</Col>
					<Col xs='5'>
						{this.props.contestEnd ? <span> Contest Over </span> : <Time onTimeChange={this.props.onEndTimeChange} id={this.props.id} startEnd={this.props.contestEnd} date={this.props.contestEndDate} time={this.props.contestEndTime} />}
					</Col>
					<Col xs='1'>
					 <Button value={this.props.id} onClick={this.onReg}> Register </Button>
					</Col>
				</Row>
			</Container>
		)
	}
}