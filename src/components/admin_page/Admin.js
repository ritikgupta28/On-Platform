import React from 'react'

import Navbar from './Navbar/Navbar'
import Header from './Header'
import Main from './Main'
import Footer from './Footer'

export default class Admin extends React.Component {
	render() {
		return (
			<div className='Adm'>
				<Header />
				<Navbar />
				<Main />
				<Footer />
			</div>
		)
	}
}