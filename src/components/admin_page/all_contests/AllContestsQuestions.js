import React, { Component } from 'react';

import Card from '../QuestionContestCard';
import ErrorHandler from '../../error_handler/ErrorHandler'

class AllContestsQuestions extends Component {
  state = {
    questions: [],
    error: null
  };

  catchError = error => {
    this.setState({ error: error })
  }

   errorHandler = () => {
    this.setState({ error: null });
  };

  componentDidMount() {
    const contestId = this.props.match.params.id;
    fetch('http://localhost:8000/feed/allcontests/questions/' + contestId, {
      headers: {
        Authorization: 'Bearer ' + this.props.token,
        'Content-Type': 'application/json'
      }
      })
      .then(res => {
        if (res.status !== 200) {
          throw new Error('error');
        }
        return res.json();
      })
      .then(resData => {
        this.setState({
          questions: resData.questions
        });
      })
      .catch(this.catchError);
  }

  render() {
    return (
      <div>
        <ErrorHandler error={this.state.error} onHandle={this.errorHandler} />
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
