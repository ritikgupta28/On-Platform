import React from 'react'
import './Question.css'
import ErrorHandler from '../error_handler/ErrorHandler'
import Ide from '../ide/Ide'
import { Container } from 'react-bootstrap'

class Question extends React.Component {
	state = {
		title: '',
		content: '',
		sinput: '',
		soutput: '',
		error: null
	};

	catchError = error => {
    this.setState({ error: error })
  }
  errorHandler = () => {
    this.setState({ error: null });
  };

	componentDidMount() {
	const questionId = this.props.match.params.id;
    fetch('http://localhost:8000/feed/question/' + questionId)
      .then(res => {
        if (res.status !== 200) {
          throw new Error('error');
        }
        return res.json();
      })
      .then(resData => {
        this.setState({
          title: resData.question.title,
          content: resData.question.content,
          sinput: resData.question.sinput,
          soutput: resData.question.soutput
        });
      })
      .catch(this.catchError);
  }

	render() {
		return (
			<Container>
			 <ErrorHandler error={this.state.error} onHandle={this.errorHandler} />
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
				<Ide 
				 token={this.props.token}
				 questionId={this.props.match.params.id} 
				/>
			</Container>
		)
	}
}

export default Question;
