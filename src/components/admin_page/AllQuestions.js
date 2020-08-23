import React, { Component, Fragment } from 'react';
import Card from './QuestionCard';
import { Spinner } from 'react-bootstrap'
import Pagination from '../pagination/Pagination'
import ErrorHandler from '../error_handler/ErrorHandler'

class AllQuestions extends Component {
    state = {
			questions: [],
      questionsLoading: true,
      totalQuestions: 0,
      questionPage: 1,
      status: '',
      error: null
		}

  catchError = error => {
    this.setState({ error: error, questionsLoading: false })
  } 

  errorHandler = () => {
    this.setState({ error: null });
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
      .then(res => {
        if (res.status !== 200) {
          throw new Error('Failed to fetch user status.');
        }
        return res.json();
      })
      .then(resData => {
        this.setState({ status: resData.status });
      })
      .catch(this.catchError);

      this.loadQuestions();
	};

  loadQuestions = direction => {
    if (direction) {
      this.setState({ questionsLoading: true, questions: [] });
    }
    let page = this.state.questionPage;
    if (direction === 'next') {
      page++;
      this.setState({ questionPage: page });
    }
    if (direction === 'previous') {
      page--;
      this.setState({ questionPage: page });
    }

    fetch('http://localhost:8000/feed/questions?page=' + page , {
      headers: {
        Authorization: 'Bearer ' + this.props.token,
        'Content-Type': 'application/json'
      }
    })
    .then(res => {
        if (res.status !== 200) {
          throw new Error('Failed to fetch user status.');
        }
        return res.json();
    })
    .then(resData => {
        this.setState({
          questions: resData.questions,
          totalQuestions: resData.totalQuestions,
          questionsLoading: false
        });
     })
     .catch(this.catchError);
  };

	render() {
		return (
	   <Fragment>
     <ErrorHandler error={this.state.error} onHandle={this.errorHandler} />
     {this.state.questionsLoading && (
     <div style={{ textAlign: 'center', marginTop: '2rem' }}>
	   <Spinner 
      size='lg'
      variant="primary"
      animation="border" 
      role="status"
      />
     </div>
     )}
	   {!this.state.questionsLoading && (
     <Pagination
      onPrevious={this.loadQuestions.bind(this, 'previous')}
      onNext={this.loadQuestions.bind(this, 'next')}
      lastPage={Math.ceil(this.state.totalQuestions / 2)}
      currentPage={this.state.questionPage}
     >
		 
      {
      this.state.questions.map(q => (
      <Card
              sign={'+'}
              hoverText={'Add to Contest'}
              handle={this.handle}
              key={q._id}
              id={q._id}
              title={q.title}
            />
      ))
     }
     <br/>
     </Pagination>
     )}
     </Fragment>
		)
	}
}

export default AllQuestions;
