import React from 'react'
import { Container } from 'react-bootstrap'

export default class Help extends React.Component {
	render() {
		return (
			<Container>
			  <h2 style={{ textAlign: 'center' }}>Some Basic Steps to use the Website Properly.</h2>
				<p>1. Firstly, Create an Account.</p>
				<p>2. In the tab of Questions, you see your previously added questions and a (+) sign with all questions.</p>
				<p>3. In the tab of Add Questions, you can Add question in the questions list of yours.
				(Please Note that you fill all details in the respective Input Space).</p>
				<p>4. After pressing the button in all questions tab your question send to the New Contest tab, 
				here you can Host a Contest after filling all mentiond details. here a (-) sign button is also there 
				which is used for removing question from the contest.</p>
				<p>5. After Host a contest you can see it in the tab of Final Contest
				(here you see all contest which are currentlly running).
				Here a End button is also there which is used for the end the contest manually
				(if you don't press it don't worry it will automatically ended after the Time's Up).</p>
				<p>6. After ending the contest it will goes to All Contest tab
				(here you see all ended contest which were held previously).
				Here a Result button is also there which is help you to see the leaderboard where you can see 
				all the paricipants in the contest and their Total Score and 
				if you want to see a particular question code of a user you can also see it.</p>
				<p>7. Here a online IDE is also available for 2 languages(C++ and python).</p>
			</Container>
		)
	}
}