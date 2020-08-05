import React from 'react'
import './Admin.css'
import logo from '../images/logo1.jpeg'
import { Link } from 'react-router-dom' 

class Header extends React.Component {
	render() {
		return (
			<div className='head'>
				<img className = 'log' alt='logo' src= {logo}></img>
                <h1 className = 'headi'>Admin_Page</h1>
                <Link to='/'>
                <button className='but' type="submit" value='Signout'>Sign Out</button>
                </Link>
            </div>
		)
	}
}

export default Header;