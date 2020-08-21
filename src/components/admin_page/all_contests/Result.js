import React from 'react'
import ErrorHandler from '../../ErrorHandler/ErrorHandler'

export default class Result extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			participants: [],
			error: null
		}
	};

	catchError = error => {
    this.setState({ error: error })
  }

   errorHandler = () => {
    this.setState({ error: null });
  };

	componentDidMount() {
    const contestId = this.props.match.params.id;
		fetch('http://localhost:8000/feed/result/' + contestId, {
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
				participants: resData.participants
			});
		})
		.catch(this.catchError);
	}

	render() {
		return (
			<div>
			    <ErrorHandler error={this.state.error} onHandle={this.errorHandler} />
				{
					this.state.participants.map(user => (
					<div key={user.userId} style={{ display: 'flex'}}>
						<p>{user.userId}</p>
						<p style={{paddingLeft: '20px'}}>{user.totalScore}</p>
					</div>
				    ))
				}
			</div>
		)
	}
}