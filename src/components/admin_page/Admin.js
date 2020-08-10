import React from 'react'

import './Admin.css'
import Footer from './Footer'
import Navbar from './navigation_bar/Navbar'

export default class Admin extends React.Component {
	render() {
		return (
			<div className='Adm'>
				<Navbar token = {this.props.token} />
				<Footer />
			</div>
		)
	}
}