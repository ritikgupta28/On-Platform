import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import Time from '../../Time';

export default class CardContest extends React.Component {
	render() {
		return (
			<Container style={{ fontSize: '20px', padding: '10px 50px', border: '1px solid black' }}>
				<Row>
			  	<Col>
			  		{this.props.start 
			  			? 
			  			<Link to={`/finalcontest/questions/${this.props.id}`}> 
			  			 <p>{this.props.title}</p> 
			  			</Link> 
			  			: 
			  			<p>{this.props.title}</p> 
			  		}
					</Col>
					<Col>
						{this.props.start 
							? 
							<span> 00:00:00 </span> 
							: 
							<Time onTimeChange={this.props.onTimeChange} date={this.props.date} time={this.props.time} />
						}
					</Col>
					<Col md="auto">
					 <Button onClick={this.props.onRegChange}>{this.props.reg}</Button>
					</Col>
				</Row>
			</Container>
		)
	}
}