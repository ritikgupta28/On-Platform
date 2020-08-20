import React, { Component } from 'react';
import Card from '../QuestionContestCard';

class AllContestsQuestions extends Component {
  state = {
    questions: []
  };

  componentDidMount() {
    const contestId = this.props.match.params.id;
    fetch('http://localhost:8000/feed/allcontests/questions/' + contestId, {
      headers: {
        Authorization: 'Bearer ' + this.props.token,
        'Content-Type': 'application/json'
      }
      })
      .then(res => res.json())
      .then(resData => {
        this.setState({
          questions: resData.questions
        });
      })
      .catch(err => { console.log(err); });
  }

  render() {
    return (
      <div>
        {
          this.state.questions.map(q=> (
            <Card
            key={q.questionId._id}
            id={q.questionId._id}
            title={q.questionId.title}
          />
          ))
        }
      </div>
    )
  }
}

export default AllContestsQuestions;