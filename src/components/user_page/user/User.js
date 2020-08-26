import React from 'react'

import './User.css'
import Footer from './Footer'
import Navbar from './navigation_bar/Navbar'

export default class User extends React.Component {
	render() {
		return (
			<div>
				<Navbar 
				 token={this.props.token} 
				 logout={this.props.logout} 
				/>
				<Footer />
			</div>
		)
	}
}