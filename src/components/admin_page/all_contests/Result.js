import React, { Component, Fragment } from 'react';
import { Container } from 'react-bootstrap';

import ErrorHandler from '../../error_handler/ErrorHandler';

class Result extends Component {
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
			if(res.status !== 200) {
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
			<Fragment>
			    <ErrorHandler error={this.state.error} onHandle={this.errorHandler} />
				{
					this.state.participants.map(user => (
						<Container style={{ fontSize: '20px', textAlign: 'center', border: '1px solid black'}}>
							<div className='questioncard'>
								<p>{user.userId.name}</p>
								<p style={{paddingLeft: '20px'}}>{user.totalScore}</p>
							</div>
						</Container>
				    ))
				}
			</Fragment>
		)
	}
}

export default Result;
