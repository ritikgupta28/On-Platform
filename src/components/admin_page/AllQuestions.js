import React, { Component } from 'react';
import Card from './Card';

class AllQuestions extends Component {
	constructor(props) {
    super(props);
    this.state = {
			questions: []
		}
  };

	handle = (e) => {
    fetch('http://localhost:8000/feed/newcontest', {
      method: 'POST',
      headers: {
        Authorization: 'Bearer ' + this.props.token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        questionId: e.target.value
    	})
    })
    .then(response => response.json())
    .catch(err => console.log(err));
  }

	componentDidMount() {
		fetch('http://localhost:8000/feed/questions', {
      headers: {
        Authorization: 'Bearer ' + this.props.token,
        'Content-Type': 'application/json'
      }
    })
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
		{this.state.questions.map(q => (
            <Card
              sign={'+'}
              handle={this.handle}
              key={q._id}
              id={q._id}
              title={q.title}
            />
        ))}
      </div>
		)
	}
}

export default AllQuestions;