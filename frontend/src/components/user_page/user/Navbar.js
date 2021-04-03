import React from 'react'
import { Route, Link, Redirect, Switch, HashRouter as Router, withRouter } from 'react-router-dom'
import { Navbar, Nav, Button, Image, NavDropdown } from 'react-bootstrap'

import svg from '../../svg/profile.svg'
import FinalContest from '../final_contest/FinalContest'
import FinalContestQuestions from '../final_contest/FinalContestQuestions'
import Question from '../../single_question/Question'
import Ide from '../../ide/Ide'
import About from './About'
import Help from './Help'

class navbar extends React.Component {
	render() {
		return (
			<Router>
				<div style={{ fontSize: '1.41rem'}}>
					<Navbar 
						activekey={1} 
						collapseOnSelect 
						expand="lg" 
						bg="dark" 
						variant="dark" 
						sticky="top"
					>
						<Navbar.Brand eventkey={0}>On-Platform</Navbar.Brand>
						<Navbar.Toggle aria-controls="responsive-navbar-nav" />
						<Navbar.Collapse id="responsive-navbar-nav" >
							<Nav className="mr-auto">
          		  <Nav.Link eventkey={1} as={Link} to='user/finalcontest'>Contest</Nav.Link>
								<Nav.Link eventkey={2}as={Link} to='/ide'>Online IDE</Nav.Link>
							</Nav>
							<Nav md="auto" >
								<Nav.Link eventkey={6} as={Link} to='/user/about'>
									<Image src={svg} rounded style={{ height: '50px'}} />
								</Nav.Link>
								<NavDropdown alignRight id="collasible-nav-dropdown">
									<NavDropdown.Item eventkey={6} as={Link} to='/user/about'>
										<Button block variant="outline-dark">About</Button>
									</NavDropdown.Item>
									<NavDropdown.Item eventkey={6} as={Link} to='/user/help'>
										<Button block variant="outline-dark">Help</Button>
									</NavDropdown.Item>
									<NavDropdown.Item eventkey={7} as={Link} to='/'>
										<Button block variant="outline-dark" onClick={this.props.logout}>Sign Out</Button>
									</NavDropdown.Item>
								</NavDropdown>
							</Nav>
						</Navbar.Collapse>
					</Navbar>
					<br />
					<div>
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
					    			  {...props}
			    	   				token={this.props.token}
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
					    			  {...props}
			    	   			  token={this.props.token}
			    	   			/>
					    		)}
					    	/>
					    	<Route
					    		path="/user/help"
					    		exact
					    		render = {props => (
					    			<Help
					    			  {...props}
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

export default withRouter(navbar);