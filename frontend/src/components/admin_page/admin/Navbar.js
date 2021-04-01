import React from 'react'
import { Route, Link, Switch, HashRouter as Router, withRouter, Redirect } from 'react-router-dom'
import { Navbar, Nav, NavDropdown, Button, Image } from 'react-bootstrap'
import svg from '../../svg/profile.svg'
import AllQuestions from '../AllQuestions'
import AddQuestion from '../AddQuestion'
import NewContest from '../NewContest'
import FinalContest from '../final_contest/FinalContest'
import FinalContestQuestions from '../final_contest/FinalContestQuestions'
import AllContests from '../all_contests/AllContests'
import AllContestsQuestions from '../all_contests/AllContestsQuestions'
import Question from '../../single_question/Question'
import Result from '../all_contests/Result'
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
				   	<Navbar.Brand eventkey={0}>Platform-Up</Navbar.Brand>
				   	<Navbar.Toggle aria-controls="responsive-navbar-nav" />
				   	<Navbar.Collapse id="responsive-navbar-nav">
					   	<Nav className="mr-auto">
					   		<Nav.Link eventkey={1} as={Link} to='/admin/questions'>Questions</Nav.Link>
					   		<Nav.Link eventkey={2} as={Link} to='/admin/addquestion'>Add Question</Nav.Link>
					   		<NavDropdown title="Contest" id="collasible-nav-dropdown">
					   			<NavDropdown.Item eventkey={3} as={Link} to='/admin/newcontest'>New Contest</NavDropdown.Item>
					   			<NavDropdown.Item eventkey={4} as={Link} to='/admin/finalcontest'>Final Contest</NavDropdown.Item>
					   			<NavDropdown.Item eventkey={5} as={Link} to='/admin/allcontests'>All Contest</NavDropdown.Item>
					   		</NavDropdown>
					   	</Nav>
					   	<Nav md="auto">
					   		<Nav.Link eventkey={6} as={Link} to='/admin/about'>
					   			<Image src={svg} rounded style={{ height: '50px'}} />
					   		</Nav.Link>
					   		<NavDropdown title="" alignRight id="collasible-nav-dropdown">
					   			<NavDropdown.Item eventkey={6} as={Link} to='/admin/about'>
					   				<Button block variant="outline-dark">About</Button>
					   			</NavDropdown.Item>
					   			<NavDropdown.Item eventkey={6} as={Link} to='/admin/help'>
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
					   	<Route
					   		path="/admin/questions"
					    	exact
					    	render = {props => (
					    		<AllQuestions
					    		{...props}
									token={this.props.token}
					    		/>
					   		)}
					    />
					    <Route
					    	path="/admin/addquestion"
					    	exact
					    	render = {props => (
					    		<AddQuestion
					    		 {...props}
					   				token={this.props.token}
					   			/>
					    	)}
					    />
					    <Route
					    	path="/admin/newcontest"
				     		exact
		    	   		render = {props => (
	    		   			<NewContest
	    		   				{...props}
	    	   					token={this.props.token}
	    	  				/>
		    	   		)}
		    	   	/>
					    <Route
					    	path="/admin/finalcontest"
					    	exact
					    	render = {props => (
				    			<FinalContest
				    				{...props}
					    			adminId={this.props.adminId}
										token={this.props.token}
					    		/>
					    	)}
					    />
					    <Route
					    	path="/finalcontest/questions/:id"
	    		   		render = {props => (
	    	   				<FinalContestQuestions
	    	   					{...props}
	    	   					token={this.props.token}
		    	   			/>
		    	   		)}
		    	   	/>
					    <Route
					    	path="/admin/allcontests"
					    	exact
				    		render = {props => (
				    			<AllContests
				    				{...props}
										token={this.props.token}
				    			/>
					    	)}
					    />
					    <Route
					    	path="/allcontests/questions/:id"
	    		   		render = {props => (
	    		   			<AllContestsQuestions
	    	   					{...props}
	    	   					token={this.props.token}
	    	   				/>
		    	   		)}
		    	   	/>
		    	   	<Route
		    	  		path="/admin/about"
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
		    	  		path="/result/:id"
	    		   		render = {props => (
	    		   			<Result
	    	   					{...props}
	    	   					token={this.props.token}
	    	   				/>
		    	   		)}
		    	   	/>
	    	   		<Route
		    	  		path="/admin/help"
	    		   		render = {props => (
	    		   			<Help
	    	   					{...props}
	    	   					token={this.props.token}
	    	   				/>
		    	   		)}
		    	   	/>
		    	   	<Redirect to="/admin/questions" />
				    </Switch>
	    		</div>
				</div>
			</Router>
		)
	}
}

export default withRouter(navbar);