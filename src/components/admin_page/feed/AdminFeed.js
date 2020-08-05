import React, { Component } from 'react';

import Question from './Question.js';

class AdminFeed extends Component {
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
			<div style={{ textAlign: 'center', marginTop: '20px' }}>
				{this.state.questions.map(question => (
          <Question
          	key={question._id}
          	id={question._id}
          	title={question.title}
          	content={question.content}
          	sinput={question.sinput}
          	soutput={question.soutput}
          />
        ))}
      </div>
		)
	}
}

export default AdminFeed;