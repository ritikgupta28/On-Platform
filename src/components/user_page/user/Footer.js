import React from 'react'
import { Container } from 'react-bootstrap'

export default class Footer extends React.Component {
	render() {
		return (
			<Container fluid style={{ textAlign: 'center', backgroundColor: 'rgb(7, 2, 15)', padding: '10px' }}>
				<h2>Made by Sahil & Ritik</h2>
			</Container>
		)
	}
}