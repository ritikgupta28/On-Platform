import React from 'react'
import { Route, Link, Redirect, Switch, BrowserRouter as Router } from 'react-router-dom'

import './Navbar.css'
import logo from '../../../images/logo1.jpg'
import FinalContest from '../../final_contest/FinalContest'
import FinalContestQuestions from '../../final_contest/FinalContestQuestions'
import Question from '../../../single_question/Question'
import Ide from '../../../ide/Ide'

export default class Navbar extends React.Component {
	render() {
		return (
			<Router >
				<div className='na'>
					<ul className='one'>
						<Link to='/user/finalcontest'>
							<li value='contest'>Contest</li>
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
							<Route path="/user/finalcontest"
								exact
								render = {props => (
									<FinalContest
										{...props}
										token={this.props.token}
									/>
								)}
							/>
							<Route path="/finalcontest/questions/:id"
								render = {props => (
									<FinalContestQuestions
										{...props}
										token={this.props.token}
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
					    	<Route
					    		path="/question/:id"
					    		render = {props => (
					    			<Question
					    				{...props}
			    	   					token={this.props.token}
			    	   				/>
					    		)}
					    	/>
					    	<Route
					    		path="/ide"
					    		exact
					    		render = {props => (
					    			<Ide
			    	   					token={this.props.token}
			    	   				/>
					    		)}
					    	/>
					    	<Redirect to="/user/finalcontest" />
				    	</Switch>
		    		</div>
				</div>
			</Router>
		)
	}
}