import React from 'react';
import './welcome.css'
import { Link } from 'react-router-dom' 
import logo from '../images/logo1.jpeg'

class Header extends React.Component {
    render() {
        return(
            <div className = "header">
             <img className = "logo" alt='logo' src= {logo}></img>
             <h1 className = "heading">Welcome to SSR-Web</h1>
             <Link to='Developers'>
             <button className='but' value='Developers'>Developers</button>
             </Link>
            </div>
        );
    }
}

export default Header;