import React from 'react'
import { Container, Image } from 'react-bootstrap'

import svg from '../../svg/help.svg'
import Header from './HelpHeader'
import Footer from '../Footer'

export default class Help extends React.Component {
	render() {
		return (
			<div>
				<Header />
				<Container style={{ padding: '10px 50px' }}>
					<h2 style={{ textAlign: 'center' }}>Some Basic Steps to use the Website Properly.</h2>
					<div style={{ textAlign: 'center' }}>
						<Image src={svg} rounded />
					</div>
					<p>1. Firstly, Create an Account.</p>
					<p>2. If you are user, create an account as an User.</p>
					<p>3. If you are admin, create an account as an Admin.</p>
					<p>4. Then login with same credentials and after login you have an option of help, press that for more help.</p>
				</Container>
				<div style={{ marginTop: '40px'}}>
					<Footer />
				</div>
			</div>
		)
	}
}