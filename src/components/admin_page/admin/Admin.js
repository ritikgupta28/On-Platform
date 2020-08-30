import React from 'react'

import Footer from './Footer'
import Navbar from './navigation_bar/Navbar'

export default class Admin extends React.Component {
	render() {
		return (
			<div>
				<Navbar 
				 hpath={this.props.hpath}
				 adminId={this.props.adminId} 
				 token={this.props.token} 
				 logout={this.props.logout} 
				 />
				<Footer />
			</div>
		)
	}
}