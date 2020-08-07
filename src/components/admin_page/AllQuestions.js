import React, { Component } from 'react';
import Card from './Card';

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
	   <div>
		{this.state.questions.map(question => (
            <Card
            key={question._id}
             id={question._id}
             title={question.title}
            />
        ))}
      </div>
		)
	}
}

export default AllQuestions;