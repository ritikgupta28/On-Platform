import React from 'react'

import './Admin.css'
import Footer from './Footer'
import Navbar from './navigation_bar/Navbar'
import Welcome from '../welcome_page/Welcome'

export default class Admin extends React.Component {
	constructor() {
		super();
		this.state = {
			route: 'admin'
		}
	}
	onRouteChange = (text) => {
		this.setState({
			route: text
		})
	}
	render() {
		return (
		<div>
		    {
			this.state.route === 'welcome'
			?
			<div>
			<Welcome onRouteChange={this.onRouteChange}/>
			</div>
			:
			<div className='Adm'>
				<Navbar onRouteChange={this.onRouteChange}/>
				<Footer />
			</div>
		    }
		</div>
		)
	}
}