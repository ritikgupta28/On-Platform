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
            <Main 
            onUsersignup={this.props.onUsersignup} 
            onUserlogin={this.props.onUserlogin} 
            onAdminsignup={this.props.onAdminsignup} 
            onAdminlogin={this.props.onAdminlogin} 
            onChangeUserAdmin={this.props.onChangeUserAdmin}
            />
            <Footer/>
            </div>
   		)
	}
};