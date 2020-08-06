import React from 'react'

import Footer from './Footer'
import Navbar from './navigation_bar/Navbar'

export default class Admin extends React.Component {
	render() {
		return (
			<div className='Adm'>
				<Navbar />
				<Footer />
			</div>
		)
	}
}