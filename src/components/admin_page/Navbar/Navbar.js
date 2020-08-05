import React from 'react'
import './Navbar.css'

import { Route, Link, BrowserRouter as Router } from 'react-router-dom'
import PCON from '../PCON'
import Addques from '../feed/Addques'
import AdminFeed from '../feed/AdminFeed'

export default class Navbar extends React.Component {
	render() {
		return (
			<Router>
			<div className='na'>
			    <ul className='one'>
			    <Link to='/admin/adminfeed'>
			    <li value='ques'>Questions</li>
			    </Link>
			    <Link to='/admin/addques'>
				<li value='Addques'>Add Question</li> 
				</Link>
				<Link to='/admin/pcon'>
			    <li value='PCON'>Previous Contests</li>
			    </Link>
				<Link to='/admin/about'>
			    <li value='about'>About</li>
			    </Link>
			    </ul>
			    <div className='coc'>
			    <Route path='/admin/pcon' exact component={PCON} />
			    <Route path='/admin/adminfeed' exact component={AdminFeed} />
			    <Route path='/admin/addques' exact component={Addques} />
			    </div>
			</div>
			</Router>
		)
	}
}