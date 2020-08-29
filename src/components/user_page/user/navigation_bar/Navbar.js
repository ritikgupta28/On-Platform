import React from 'react'
import { Route, Link, Redirect, Switch, BrowserRouter as Router, withRouter } from 'react-router-dom'
import { Navbar, Nav, Button, Image, NavDropdown } from 'react-bootstrap'
import svg from '../../../svg/profile.svg'
import FinalContest from '../../final_contest/FinalContest'
import FinalContestQuestions from '../../final_contest/FinalContestQuestions'
import Question from '../../../single_question/Question'
import Ide from '../../../ide/Ide'
import About from '../About'

class navbar extends React.Component {
	render() {
		return (
			<Router>
			<div>
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
            <Nav.Link eventkey={1} as={Link} to='user/finalcontest'>Contest</Nav.Link>
            <Nav.Link eventkey={2}as={Link} to='/ide'>Online IDE</Nav.Link>
          </Nav>
          <Nav fill style={{ marginRight: '10px' }}>
					    <Nav.Link eventkey={6} as={Link} to='/user/about'>
					    	<Image src={svg} rounded style={{ height: '40px'}} />
					    </Nav.Link>
					    <NavDropdown alignRight id="collasible-nav-dropdown">
					    	<NavDropdown.Item eventkey={6} as={Link} to='/user/about'>About</NavDropdown.Item>
					    	<NavDropdown.Item eventkey={7}>
					    		<Button onClick={this.props.logout}>Sign Out</Button>
					    	</NavDropdown.Item>
					    </NavDropdown>
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
					    	<Redirect to="/user/finalcontest" />
				    	</Switch>
		    		</div>
		    		</div>
			</Router>
		)
	}
}

export default withRouter(navbar);