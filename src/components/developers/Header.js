import React from 'react';

import logo from '../images/logo1.jpeg'

class Header extends React.Component {
    render() {
        return(
            <div className="h">
             <img className="l" alt='logo' src= {logo}></img>
             <h1 className="he">Developers</h1>
            </div>
        );
    }
}

export default Header ;