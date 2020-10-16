import React from 'react'

import Footer from './Footer'
import Navbar from './Navbar'

export default class User extends React.Component {
	render() {
		return (
			<div>
				<Navbar 
				 token={this.props.token} 
				 logout={this.props.logout} 
				/>
				<br />
				<Footer />
			</div>
		)
	}
}