import React from 'react';

import './Welcome.css';
import Header from './Header';
import Footer from './Footer'
import Login from './Login'
import Register from './Register'


export default class Welcome extends React.Component {
    state = {
        route: 'login'
    }
    onRouteChange = (text) => {
        this.setState({
            route: text
        })
    }
   render() {
		return (
			<div className='home'>
            <Header />
            {
            this.state.route === 'login'
            ?
            <Login 
             onRouteChange={this.onRouteChange}
             onChangeUserAdmin={this.props.onChangeUserAdmin}
             onUserlogin={this.props.onUserlogin} 
             onAdminlogin={this.props.onAdminlogin} 
            />
            :
            <Register 
             onRouteChange={this.onRouteChange}
             onChangeUserAdmin={this.props.onChangeUserAdmin}
             onUsersignup={this.props.onUsersignup}
             onAdminsignup={this.props.onAdminsignup} 
            />
            }
            <Footer />
            </div>
   		)
	}
};