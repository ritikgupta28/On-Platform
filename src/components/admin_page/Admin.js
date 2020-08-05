import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom' 

import Header from './Header'
import Main from './Main'
import Footer from './Footer'
import Addques from './feed/Addques'

export default class Admin extends React.Component {
	render() {
		return (
			<div className='Adm'>
				<Header />
				<Router>
					<div>
						<Route path='/Addques' component={Addques}/>
						<Route path='/Admin' component={Main} />
					</div>
				</Router>
				<Footer />
			</div>
		)
	}
}