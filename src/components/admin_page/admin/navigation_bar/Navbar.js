import React from 'react'
import { Route, Link, Switch, BrowserRouter as Router } from 'react-router-dom'
import { Navbar, Nav, NavDropdown, Button } from 'react-bootstrap'

import './Navbar.css'
import AllQuestions from '../../AllQuestions'
import AddQuestion from '../../AddQuestion'
import NewContest from '../../NewContest'
import FinalContest from '../../final_contest/FinalContest'
import FinalContestQuestions from '../../final_contest/FinalContestQuestions'
import AllContests from '../../all_contests/AllContests'
import AllContestsQuestions from '../../all_contests/AllContestsQuestions'
import Question from '../../../single_question/Question'
import Result from '../../all_contests/Result'
import About from '../About'

export default class navbar extends React.Component {
	render() {
		return (
			<Router >
				<div className='na'>
					<Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" sticky="top">
				    	<Navbar.Brand href="#home">Platform-Up</Navbar.Brand>
				    	<Navbar.Toggle aria-controls="responsive-navbar-nav" />
				    	<Navbar.Collapse id="responsive-navbar-nav">
					    	<Nav className="mr-auto">
					    		<Nav.Link as={Link} to='/admin/questions'>Questions</Nav.Link>
					    		<Nav.Link as={Link} to='/admin/addquestion'>Add Question</Nav.Link>
					    		<NavDropdown title="Contest" id="collasible-nav-dropdown">
					    			<NavDropdown.Item as={Link} to='/admin/newcontest'>New Contest</NavDropdown.Item>
					    			<NavDropdown.Item as={Link} to='/admin/finalcontest'>Final Contest</NavDropdown.Item>
					    			<NavDropdown.Divider />
					    			<NavDropdown.Item as={Link} to='/admin/allcontests'>All Contests</NavDropdown.Item>
					    		</NavDropdown>
					    	</Nav>
					    	<Nav fill>
					    		<Nav.Link as={Link} to='/admin/about'>About</Nav.Link>
					    		<Button eventkey={2} onClick={this.props.logout}>Sign Out</Button>
					    	</Nav>
						</Navbar.Collapse>
					</Navbar>
			    	<div className='coc'>
			    		<Switch>
					    	<Route
					    		path="/admin/questions"
						    	exact
						    	render = {props => (
						    		<AllQuestions
										token={this.props.token}
						    		/>
					    		)}
						    />
						    <Route
						    	path="/admin/addquestion"
						    	exact
						    	render = {props => (
						    		<AddQuestion
					    				token={this.props.token}
					    			/>
						    	)}
						    />
						    <Route path="/admin/newcontest"
				    	   		exact
			    		   		render = {props => (
			    		   			<NewContest
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
					    </Switch>
		    		</div>
				</div>
			</Router>
		)
	}
}
