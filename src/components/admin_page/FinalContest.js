import React, { Component } from 'react';
import Card from './Card';

class Contest extends Component {
  state = {
    questions: []
  };

  componentDidMount() {
    const contestId = this.props.match.params.id;
    fetch('http://localhost:8000/feed/allcontest/questions/' + contestId, {
      headers: {
        Authorization: 'Bearer ' + this.props.token,
        'Content-Type': 'application/json'
      }
      })
      .then(res => res.json())
      .then(resData => {
      	console.log(resData.questions);
        this.setState({
          questions: resData.questions
        });
      })
      .catch(err => { console.log(err); });
  }

  handle = (e) => {
    console.log(e.target.value);
  }

  render() {
    return (
      <div>
        {
          this.state.questions.map(q=> (
            <Card
            sign={'view'}
            handle={this.handle}
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

export default Contest;