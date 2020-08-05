import React from 'react'
import './Navbar.css'

import { Link } from 'react-router-dom'

export default class Navbar extends React.Component {
	render() {
		return (
			<div className='na'>
			    <ul className='one'>
			    <Link to='/AdminFeed'>
			    <li value='ques'>Questions</li>
			    </Link>
			    <Link to='/Addques'>
				<li value='Addques'>Add Question</li> 
				</Link>
				<Link to='/PCON'>
			    <li value='PCON'>Previous Contests</li>
			    </Link>
				<Link to='/About'>
			    <li className='push' value='about'>About</li>
			    </Link>
			    </ul>
			</div>
		)
	}
}