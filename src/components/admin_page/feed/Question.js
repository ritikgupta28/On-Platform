import React from 'react'
import '../../Ques/Ques.css'

export default class Question extends React.Component {
	render() {
		return (
			<div className='dsc'>
			<div className='tit'>
			 <h2>{this.props.title}</h2>
			</div>
			<div className='con'>
				<p>{this.props.content}</p>
				<pre>
				  <strong>Sample Input:</strong>
				  <p>{this.props.sinput}</p>
				  <strong>Sample Output:</strong>
				  <p>{this.props.soutput}</p>
				  <strong>Explanation:</strong>
				  <p>explanation goes here...</p>
				</pre>
			</div>
			</div>
		)
	}
}