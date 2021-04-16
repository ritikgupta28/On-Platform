import React from 'react'
import { Container, Image } from 'react-bootstrap'
import svg from '../../svg/help.svg'

export default class Help extends React.Component {
	render() {
		return (
			<Container style={{ padding: '10px 50px' }}>
			  <h2 style={{ textAlign: 'center' }}>Some Basic Steps to use the Website Properly.</h2>
			  <div style={{ textAlign: 'center' }}>
			   <Image src={svg} rounded />
			  </div>
				<p>1. Create account as an Admin.</p>
				<p>2. After login, all questions added by admin are there.</p>
				<p>3. With (+) sign admin can add that question to new contest.</p>
				<p>4. In tab of add question admin can create and add new question.</p>
				<p>5. Admin can host new contest by adding questions with start and end time and date.</p>
				<p>6. When contest is started all users who are registered now able to participate in the contest.</p>
				<p>7. When contest is over, contest will automatically hide.</p>
				<p>8. After contest is over only admin can see that contest with leader board on All Contests page.​</p>
			</Container>
		)
	}
}