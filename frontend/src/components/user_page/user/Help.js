import React from 'react'
import { Container, Image } from 'react-bootstrap'
import svg from '../../svg/help.svg'

export default class Help extends React.Component {
	render() {
		return (
			<Container style={{ padding: '10px 50px' }}>
			  <h2 style={{ textAlign: 'center' }}>Some Basic Steps to use the Website Properly.</h2>
			  <div style={{ textAlign: 'center' }}>
			   <Image src={svg} rounded />
			  </div>
				<p>1. Create an account as an User.​</p>
				<p>2. After login, there is a Contest Tab where you see all the running contests.​</p>
				<p>3. User must register before attempt any contest.​</p>
				<p>4. After register and contest is started user can participate in that contest.</p>
				<p>5. User submit their code on an online IDE which supports 2 languages (C++ and Python).</p>
				<p>6. After contest is over user not submit their solution.</p>
			</Container>
		)
	}
}