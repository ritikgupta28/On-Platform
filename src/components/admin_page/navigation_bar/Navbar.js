import React from 'react'
import { Route, Redirect, Link, Switch, BrowserRouter as Router } from 'react-router-dom'

import './Navbar.css'
import logo from '../../images/logo1.jpg'
import AllQuestions from '../AllQuestions'
import AddQuestion from '../AddQuestion'
import NewContest from '../NewContest'
import FinalContest from '../FinalContest'
import FinalContestQuestions from '../FinalContestQuestions'
import AllContests from '../AllContests'
import AllContestsQuestions from '../AllContestsQuestions'
import Question from '../../single_question/Question'
import Ide from '../../ide/Ide'

export default class Navbar extends React.Component {
	render() {
		return (
			<Router >
				<div className='na'>
			    <ul className='one'>
				    <Link to='/admin/questions'>
					    <li value='ques'>Questions</li>
			  	  </Link>
			    	<Link to='/admin/addquestion'>
							<li value='Addques'>Add Question</li>
						</Link>
						<Link to='/admin/newcontest'>
				    	<li value='contest'>New Contest</li>
				    </Link>
						<Link to='/admin/finalcontest'>
				    	<li value='PCON'>Final Contest</li>
				    </Link>
						<Link to='/admin/allcontests'>
				    	<li value='PCON'>All Contests</li>
				    </Link>
						<Link to='/admin/about'>
							<li value='about'><img className = 'log' alt='logo' src= {logo}></img></li>
				    </Link>
				    <Link to='/'>
    	        <button className='but' type="submit" value='Signout' onClick={this.props.logout}>Sign Out</button>
    	      </Link>
		    	</ul>
			    <div className='coc'>
			    	<Switch>
					    <Route
					    	path="/admin/questions"
					    	exact
					    	render = {props => (
					    		<AllQuestions
					    			{...props}
										token = {this.props.token}
					    		/>
					    	)}
					    />
					    <Route
					    	path="/admin/addquestion"
					    	exact
					    	render = {props => (
					    		<AddQuestion
					    			token = {this.props.token}
					    		/>
					    	)}
					    />
			    	  <Route path="/admin/newcontest"
			    	   	exact
			    	   	render = {props => (
			    	   		<NewContest
			    	   			token = {this.props.token}
			    	  		/>
			    	   	)}
			    	  />
					    <Route
					    	path="/admin/finalcontest"
					    	exact
					    	render = {props => (
					    		<FinalContest
					    			{...props}
					    			adminId = {this.props.adminId}
										token = {this.props.token}
					    		/>
					    	)}
					    />
					    <Route path="/finalcontest/questions/:id"
			    	   	render = {props => (
			    	   		<FinalContestQuestions
			    	   		  {...props}
			    	   			token = {this.props.token}
			    	   		/>
			    	   	)}
			    	  />
					    <Route
					    	path="/admin/allcontests"
					    	exact
					    	render = {props => (
					    		<AllContests
					    			{...props}
										token = {this.props.token}
					    		/>
					    	)}
					    />
					    <Route path="/allcontests/questions/:id"
			    	   	render = {props => (
			    	   		<AllContestsQuestions
			    	   		  {...props}
			    	   			token = {this.props.token}
			    	   		/>
			    	   	)}
			    	  />
			    	  <Route path="/admin/about"
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
					    		token = {this.props.token}
					    		/>
					    	)}
					    />
			    	  <Route path="/ide"
			    	   	render = {props => (
			    	   		<Ide
			    	   			token = {this.props.token}
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