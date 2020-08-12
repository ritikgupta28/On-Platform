import React from 'react'
import { Route, Link, Redirect, Switch, BrowserRouter as Router } from 'react-router-dom'

import './Navbar.css'
import logo from '../../images/logo1.jpg'
import Ide from '../../ide/Ide'

export default class Navbar extends React.Component {
	render() {
		return (
			<Router >
				<div className='na'>
			    <ul className='one'>
						<Link to='/user/contest'>
				    	<li value='contest'>Contest</li>
				    </Link>
						<Link to='/user/previouscontest'>
				    	<li value='PCON'>Previous Contests</li>
				    </Link>
						<Link to='/user/about'>
							<li value='about'><img className = 'log' alt='logo' src= {logo}></img></li>
				    </Link>
				    <Link to='/'>
    	        <button className='but' type="submit" value='Signout' onClick={this.props.logout}>Sign Out</button>
            </Link>
			   	</ul>
		 	   <div className='coc'>
			    	<Switch>
			    	  <Route path="/user/contest"
			    	   	exact
			    	   	render = {props => (
			    	   		<Ide
			    	   			token = {this.props.token}
			    	   		/>
			    	   	)}
			    	  />
					    <Route
					    	path="/user/previouscontest"
					    	exact
					    	render = {props => (
					    		<Ide
			    	   			token = {this.props.token}
			    	   		/>
					    	)}
					    />
					    <Route
					    	path="/question/:id"
					    	render = {props => (
					    		<Ide
			    	   			token = {this.props.token}
			    	   		/>
					    	)}
					    />
					    <Route
					    	path="/user/about"
					    	exact
					    	render = {props => (
					    		<Ide
			    	   			token = {this.props.token}
			    	   		/>
					    	)}
					    />
			    	  <Redirect to="/user/contest" />
				    </Switch>
		    	</div>
				</div>
			</Router>
		)
	}
}