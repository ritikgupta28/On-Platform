import React, { Component } from 'react';
import Card from './Card';
import Paginator from '../Paginator/Paginator'

class AllQuestions extends Component {
	constructor(props) {
    super(props);
    this.state = {
			questions: [],
      questionsLoading: true,
      totalQuestions: 0,
      questionPage: 1,
      status: ''
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
      .then(res => {
        if (res.status !== 200) {
          console.log('Failed to fetch user status.');
        }
        return res.json();
      })
      .then(resData => {
        this.setState({ status: resData.status });
      })
      .catch(err => console.log(err));

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
          console.log('Failed to fetch user status.');
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
     .catch(err => console.log(err));
  };

	render() {
		return (
	   <div>
	   {this.state.questionsLoading && (
          <div style={{ textAlign: 'center', marginTop: '2rem' }}>
            <p>Loading</p>
          </div>
      )}
	   {!this.state.questionsLoading && (
     <Paginator
      onPrevious={this.loadQuestions.bind(this, 'previous')}
      onNext={this.loadQuestions.bind(this, 'next')}
      lastPage={Math.ceil(this.state.totalQuestions / 2)}
      currentPage={this.state.questionPage}
     >
		 {
      this.state.questions.map(q => (
            <Card
              sign={'+'}
              handle={this.handle}
              key={q._id}
              id={q._id}
              title={q.title}
            />
      ))
     }
     <br/>
     </Paginator>
     )}
     </div>
		)
	}
}

export default AllQuestions;