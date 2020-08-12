import React from 'react';
import { Link } from 'react-router-dom'

import logo from '../images/logo1.jpg'

class Header extends React.Component {
  render() {
    return (
      <div className = "header">
        <img className = "logo" alt='logo' src= {logo}></img>
        <h1 className = "heading">Welcome to SR-Web</h1>
        <Link to='developers'>
          <button className='but' value='Developers'>Developers</button>
        </Link>
      </div>
    );
  }
}

export default Header;
