import React, { Component, Fragment } from 'react';
import { Container, Button, Spinner, Row, Col, Dropdown, ButtonGroup } from 'react-bootstrap';
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
			count: '0',
			error: null
		}
	};

	componentDidMount() {
		let status;
		const contestId = this.props.match.params.id;
		fetch('http://localhost:8000/feed/result/' + contestId, {
			headers: {
				Authorization: 'Bearer ' + this.props.token,
				'Content-Type': 'application/json'
			}
		})
		.then(res => {
			status = res.status;
			return res.json();
		})
		.then(resData=> {
			this.setState({ loading: false });
			if(status === 200) {
				this.setState({ 
					participants: resData.participants,
					count: resData.count 
				});
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
	};

	onShowCode = (e) => {
		this.setState({ showCode: true, code: e.target.value })
	} 

	render() {
		return (
			<Fragment>
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
			    {this.state.showCode
			    	?
			    	<Ide code={this.state.code} />
			    	:
			    	<div>
			    		<h4 style={{ textAlign: 'center', margin: '10px' }}>Total Participants : {this.state.count}</h4>
						{this.state.participants.map(user => (
							<Container style={{ padding: '10px 50px', fontSize: '20px', border: '1px solid black'}}>
							  	<Row>
							    	<Col xs='2'>
										<p>{user.userId.name}</p>
									</Col>
									<Col xs='9'>
										<Dropdown as={ButtonGroup}>
											<Button>Questions</Button>
                							<Dropdown.Toggle split id="dropdown-split-basic" />
                							<Dropdown.Menu>
                								{user.questions.map(q => (
								  					<Dropdown.Item>
														<Button variant="outline-primary" value={q.code} onClick={this.onShowCode}>
															{q.questionId.title} -> {q.score}
														</Button>
													</Dropdown.Item>
												))}
											</Dropdown.Menu>
										</Dropdown>
									</Col>
									<Col xs='1'>
										<p>{user.totalScore}</p>
									</Col>
								</Row>
							</Container>
				    	))}
					</div>
				}
			</Fragment>
		)
	}
}

export default Result;
