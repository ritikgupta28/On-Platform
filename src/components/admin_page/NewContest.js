import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import Card from './Card';

class Contest extends Component {
	state = {
		questions: []
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
    .catch(err => console.log(err));
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
    .catch(err => console.log(err));
	}

	componentDidMount() {
		fetch('http://localhost:8000/feed/newcontest', {
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
	   	  <Link to='/admin/finalcontest'>
          <button className='but' value='s' style={{ marginBottom: '10px' }} onClick={this.handler}>Host</button>
        </Link>
        <div>
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
        </div>
      </div>
		)
	}
}

export default Contest;