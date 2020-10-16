import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
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
			  	<Col xs='2'>
			  		{this.props.start 
			  			? 
			  			<Link to={`/finalcontest/questions/${this.props.id}`}> 
			  			 <p>{this.props.title}</p> 
			  			</Link> 
			  			: 
			  			<p>{this.props.title}</p> 
			  		}
					</Col>
					<Col xs='6'>
						{this.props.start 
							? 
							<span> 00:00:00 </span> 
							: 
							<Time onTimeChange={this.props.onTimeChange} date={this.props.date} time={this.props.time} />
						}
					</Col>
					<Col xs='4'>
					 <Button value={this.props.id} onClick={this.onReg}> Register </Button>
					</Col>
				</Row>
			</Container>
		)
	}
}