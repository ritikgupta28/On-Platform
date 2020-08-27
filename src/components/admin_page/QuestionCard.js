import React from 'react'
import { Container, Button, OverlayTrigger, Tooltip,Row, Col } from 'react-bootstrap'
import { Link } from 'react-router-dom';

export default class Card extends React.Component {
	renderTooltip = (props) => (
		<Tooltip id="button-tooltip" {...props}>
         {this.props.value}
    </Tooltip>
    );

	render() {
		return (
			<Container style={{ padding: '5px', fontSize: '20px', border: '1px solid black' }}>
			  <Row>
			  <Col xs='11'>
					<Link to={`/question/${this.props.id}`}>
						<p>{this.props.title}</p>
					</Link>
				</Col>
					<OverlayTrigger
					placement="right"
					delay={{ show: 250, hide: 400 }}
					overlay={this.renderTooltip}
					>
					<Button value={this.props.id} onClick={this.props.handle}>{this.props.sign}</Button> 
					</OverlayTrigger>
				</Row>
			</Container>
		)
	}
}