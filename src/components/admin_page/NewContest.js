import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';

//import ErrorHandler from '../ErrorHandler/ErrorHandler'
import Card from './QuestionCard';

class Contest extends Component {
	state = {
		questions: [],
    error: null
	}

  componentDidMount() {
    fetch('http://localhost:8000/feed/newcontest', {
      headers: {
        Authorization: 'Bearer ' + this.props.token,
        'Content-Type': 'application/json'
      }
    })
      .then(res => {
        return res.json();
      })
      .then(resData=> {
        this.setState({
          questions: resData.questions,
        });
      })
      .catch(err => console.log(err));
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
    .then(response => response.json())
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
    .then(response => response.json())
    .catch(this.catchError);
	}

	render() {
		return (
      <Fragment>
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