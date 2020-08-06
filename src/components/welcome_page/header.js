import React from 'react';
import { Link } from 'react-router-dom'

import './Welcome.css' 
import logo from '../images/logo1.jpeg'

class Header extends React.Component {
  render() {
    return (
      <div className = "header">
        <img className = "logo" alt='logo' src= {logo}></img>
        <h1 className = "heading">Welcome to SSR-Web</h1>
        <Link to='developers'>
          <button className='but' value='Developers'>Developers</button>
        </Link>
      </div>
    );
  }
}

export default Header;