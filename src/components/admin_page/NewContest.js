import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import ErrorHandler from '../ErrorHandler/ErrorHandler'
import Card from './QuestionCard';

class Contest extends Component {
	state = {
		questions: [],
    error: null
	}

  catchError = error => {
    this.setState({ error: error })
  }

  componentDidMount() {
    fetch('http://localhost:8000/feed/newcontest', {
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
      .then(resData=> {
        this.setState({
          questions: resData.questions,
        });
      })
      .catch(this.catchError);
  };

  catchError = (error) => {
    this.setState({ error: error })
  }

	handle = (e) => {
    fetch('http://localhost:8000/feed/newcontest-delete-question', {
      method: 'POST',
      headers: {
        Authorization: 'Bearer ' + this.props.token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        questionId: e.target.value
    	})
    })
    .then(res => {
        if (res.status !== 200) {
          throw new Error('error');
        }
        return res.json();
      })
    .catch(this.catchError);
  }

  handler = (e) => {
		fetch('http://localhost:8000/feed/finalcontest', {
      method: 'POST',
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
    .catch(this.catchError);
	}

	render() {
		return (
      <Fragment>
        <ErrorHandler error={this.state.error} onHandle={this.errorHandler} />
	   	  <Link to='/admin/finalcontest'>
          <button className='but' value='s' style={{ marginBottom: '10px' }} onClick={this.handler}>Host</button>
        </Link>
         {
            this.state.questions.map(q => (
            <Card
              sign={'-'}
              handle={this.handle}
              key={q.questionId._id}
              id={q.questionId._id}
              title={q.questionId.title}
            />
            ))
          }
      </Fragment>
		)
	}
}

export default Contest;