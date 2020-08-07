import React, { Component } from 'react';
import {Link} from 'react-router-dom';

class AllQuestions extends Component {
	state = {
		questions: []
	}

	componentDidMount() {
		fetch('http://localhost:8000/feed/questions')
			.then(res => res.json())
			.then(resData=> {
				this.setState({
					questions: resData.questions
				});
			})
			.catch(err => console.log(err));
	};

	render() {
		return (
	   <div style={{ float: 'left', margin: '20px', marginLeft: '30px' }}>
		{this.state.questions.map(question => (
          <h4 key={question._id}>
          	<Link to={`/question/${question._id}`}>{question.title}</Link>
          </h4>
        ))}
      </div>
		)
	}
}

export default AllQuestions;