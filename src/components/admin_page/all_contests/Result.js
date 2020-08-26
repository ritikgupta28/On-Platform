import React, { Component } from 'react';
import { Container, Button, Spinner } from 'react-bootstrap';
import Ide from '../../ide/Ide'

import ErrorHandler from '../../error_handler/ErrorHandler';

class Result extends Component {
	constructor(props) {
		super(props);
		this.state = {
			loading: true,
			code: null,
			showCode: false,
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
		setTimeout(() => {
		const contestId = this.props.match.params.id;
		fetch('http://localhost:8000/feed/result/' + contestId, {
			headers: {
				Authorization: 'Bearer ' + this.props.token,
				'Content-Type': 'application/json'
			}
		})
		.then(res => {
			if(res.status !== 200) {
				throw new Error('error');
			}
			return res.json();
		})
		.then(resData=> {
			console.log(resData.participants)
			this.setState({
				participants: resData.participants,
				loading: false
			});
		})
		.catch(this.catchError);
	}, 3000);
	}
	onShowCode = (e) => {
		this.setState({ showCode: true, code: e.target.value })
	} 

	render() {
		return (
			<div>
			    <ErrorHandler error={this.state.error} onHandle={this.errorHandler} />
			    {this.state.showCode
			    	?
			    	<Ide code={this.state.code} />
			    	:
			    	<div>
				{
					this.state.participants.map(user => (
						<Container style={{ fontSize: '20px', textAlign: 'center', border: '1px solid black'}}>
							<div className='questioncard'>
								<p>{user.userId.name}</p>
								{
									user.questions.map(q => (
								 <Button value={q.code} onClick={this.onShowCode} >{q.questionId}</Button>
								))
								}
								<p style={{paddingLeft: '20px'}}>{user.totalScore}</p>
							</div>
						</Container>
				    ))
				}
				</div>
			}
			</div>
		)
	}
}

export default Result;
