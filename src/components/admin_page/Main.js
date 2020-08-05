import React from 'react'
import { Link } from 'react-router-dom' 
import PCON from './PCON'
import AdminFeed from './feed/AdminFeed'

class Main extends React.Component {
	render() {
		return (
			<div className='mainc'>
			  <Link to='/Addques'> 
			  <button className='butt' value='add'>Add Question</button>
			  </Link>
			   <div>
				<AdminFeed />
				<PCON />
			   </div>
			</div>
		)
	}
}

export default Main;