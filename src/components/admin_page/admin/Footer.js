import React from 'react'
import { Container } from 'react-bootstrap'

export default class Footer extends React.Component {
	render() {
		return (
			<Container fluid style={{ marginTop: '10px', textAlign: 'center', backgroundColor: 'rgb(7, 2, 15)', padding: '10px', color: 'white' }}>
				<h2>Made by Sahil & Ritik</h2>
				<p>© 2020 Platfrom-Up | All right reserved.</p>
			</Container>
		)
	}
}