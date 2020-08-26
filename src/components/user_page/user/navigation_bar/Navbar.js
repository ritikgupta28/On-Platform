import React from 'react'
import { Route, Link, Redirect, Switch, BrowserRouter as Router } from 'react-router-dom'
import { Navbar, Nav, Button } from 'react-bootstrap'

import './Navbar.css'
import FinalContest from '../../final_contest/FinalContest'
import FinalContestQuestions from '../../final_contest/FinalContestQuestions'
import Question from '../../../single_question/Question'
import Ide from '../../../ide/Ide'
import About from '../About'

export default class navbar extends React.Component {
	render() {
		return (
			<Router >
				<div className='na'>
					<Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" sticky="top">
           <Navbar.Brand>Platform-Up</Navbar.Brand>
           <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link as={Link} to='user/finalcontest'>Contest</Nav.Link>
            <Nav.Link as={Link} to='/ide'>Online IDE</Nav.Link>
          </Nav>
          <Nav fill>
           <Nav.Link as={Link} to='/user/about'>About</Nav.Link>
           <Button eventkey={2} onClick={this.props.logout} >Sign Out</Button>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
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
					    			<About
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