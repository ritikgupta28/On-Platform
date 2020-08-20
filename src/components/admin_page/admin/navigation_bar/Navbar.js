import React from 'react'
import { Route, Redirect, Link, Switch, BrowserRouter as Router } from 'react-router-dom'

import './Navbar.css'
import logo from '../../../images/logo1.jpg'
import AllQuestions from '../../AllQuestions'
import AddQuestion from '../../AddQuestion'
import NewContest from '../../NewContest'
import FinalContest from '../../final_contest/FinalContest'
import FinalContestQuestions from '../../final_contest/FinalContestQuestions'
import AllContests from '../../all_contests/AllContests'
import AllContestsQuestions from '../../all_contests/AllContestsQuestions'
import Question from '../../../single_question/Question'
import Ide from '../../../ide/Ide'
import Result from '../../all_contests/Result'

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
			    	   		<Ide
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
			    	  <Redirect to="/admin/questions" />
				    </Switch>
		    	</div>
				</div>
			</Router>
		)
	}
}