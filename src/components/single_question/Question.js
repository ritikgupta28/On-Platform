import React from 'react'
import './Question.css'
import Ide from '../ide/Ide'

class Question extends React.Component {
	state = {
		title: '',
		content: '',
		sinput: '',
		soutput: ''
	};

	componentDidMount() {
	const questionId = this.props.match.params.id;
    fetch('http://localhost:8000/feed/question/' + questionId)
      .then(res => res.json())
      .then(resData => {
        this.setState({
          title: resData.question.title,
          content: resData.question.content,
          sinput: resData.question.sinput,
          soutput: resData.question.soutput
        });
      })
      .catch(err => console.log(err));
  }

	render() {
		return (
			<div className='dsc'>
				<div className='tit'>
			    <h2>{this.state.title}</h2>
				</div>
				<div className='con'>
					<p>{this.state.content}</p>
					<pre>
				  	<strong>Sample Input:</strong>
					  <p>{this.state.sinput}</p>
					  <strong>Sample Output:</strong>
					  <p>{this.state.soutput}</p>
					</pre>
				</div>
				<Ide questionId={this.props.match.params.id}/>
			</div>
		)
	}
}

export default Question;