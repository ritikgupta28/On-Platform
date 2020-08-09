import React from 'react';

import './Welcome.css';
import Header from './Header';
import Main from './Main';
import Footer from './Footer'


export default class Welcome extends React.Component {
   render() {
		return (
			<div className = "home">
            <Header />
            <Main onSignup={this.props.onsignup} onlogin={this.props.onlogin} />
            <Footer/>
            </div>
   		)
	}
};