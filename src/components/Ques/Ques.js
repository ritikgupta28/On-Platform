import React from 'react'
import './Ques.css'

export default class Ques extends React.Component {
	render() {
		return (
			<div className='dsc'>
			<div className='tit'>
			 <h2>Title of the Ques... </h2>
			</div>
			<div className='con'>
				<p>Question Description goes Here....</p>
				<code>Math Part...</code>
				<p>Rest Ques Detail goes here...</p>
				<pre>
				  <strong>Sample Input:</strong>
				  <p>sample input data goes here...</p>
				  <strong>Sample Output:</strong>
				  <p>sample output data goes here...</p>
				  <strong>Explanation:</strong>
				  <p>explanation goes here...</p>
				</pre>
				<strong>Constrains:</strong>
				<ul>
				 <li>Case_1</li>
				 <br/>
				 <li>Case_2</li>
				</ul>
				</div>
			</div>
		)
	}
}