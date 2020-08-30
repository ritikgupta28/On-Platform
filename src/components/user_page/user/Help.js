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
				<p>1. Firstly, Create an Account.</p>
				<p>2. Here a online IDE is also available for 2 languages(C++ and python).</p>
				<p>3. After Login, you can see a Contest Tab here you see all the Running contests</p>
				<p>4. You can Register yourself after clicking the Register button</p>
				<p>5. Time is also there in the given duration you can Run the Code and submit it.</p>
				<p>6. After Times Up the contest will gone</p>
				<p>Happy Coding :)</p>   
			</Container>
		)
	}
}