import React from 'react'
import { Container, Button, OverlayTrigger, Tooltip } from 'react-bootstrap'
import { Link } from 'react-router-dom';

import './admin/Admin.css'

export default class Card extends React.Component {
	renderTooltip = (props) => (
		<Tooltip id="button-tooltip" {...props}>
         {this.props.value}
    </Tooltip>
    );

	render() {
		return (
			<Container style={{ fontSize: '20px', textAlign: 'center', border: '1px solid black'}}>
				<div className='questioncard'>
					<Link to={`/question/${this.props.id}`}>
						<p>{this.props.title}</p>
					</Link>
					<OverlayTrigger
					placement="right"
					delay={{ show: 250, hide: 400 }}
					overlay={this.renderTooltip}
					>
					<Link to="/admin/newcontest">
						<Button value={this.props.id} onClick={this.props.handle}>{this.props.sign}</Button> 
					</Link>
					</OverlayTrigger>
				</div>
			</Container>
		)
	}
}