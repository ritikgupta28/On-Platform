import React from 'react';
import Header from './Header';
import Footer from './Footer'
import Login from './auth/Login'
import Register from './auth/Register'


export default class Welcome extends React.Component {
    state = {
    	route: 'login'
    }

    onRouteChange = (text) => {
    	this.setState({ route: text })
    }
    
   render() {
		return (
			<div>
				<Header
					route={this.state.route}
					onRouteChange={this.onRouteChange}
				/>
				{this.state.route === 'login'
				?
				<Login
					onChangeUserAdmin={this.props.onChangeUserAdmin}
					onUserlogin={this.props.onUserlogin}
					onAdminlogin={this.props.onAdminlogin}
				/>
				:
				<Register
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