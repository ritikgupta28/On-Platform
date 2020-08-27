import React, { Component } from 'react';
import { Spinner } from 'react-bootstrap'
import Card from '../QuestionContestCard';
import ErrorHandler from '../../error_handler/ErrorHandler'

class AllContestsQuestions extends Component {
  state = {
    loading: true,
    questions: [],
    error: null
  };

  componentDidMount() {
    let status;
    const contestId = this.props.match.params.id;
    fetch('http://localhost:8000/feed/allcontests/questions/' + contestId, {
      headers: {
        Authorization: 'Bearer ' + this.props.token,
        'Content-Type': 'application/json'
      }
      })
      .then(res => {
        status = res.status;
        return res.json();
      })
      .then(resData => {
        this.setState({ loading: false })
        if(status === 200) {
          this.setState({ questions: resData.questions });
        }
        else {
          throw new Error(resData.message);
        }
      })
      .catch(this.catchError);
  }

  catchError = error => {
    this.setState({ error: error })
  }

   errorHandler = () => {
    this.setState({ error: null });
  }

  render() {
    return (
      <div>
      {this.state.loading && (
     <div style={{ textAlign: 'center', marginTop: '2rem' }}>
     <Spinner 
      size='lg'
      variant="primary"
      animation="border" 
      role="status"
      />
      </div>
      )}
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
