import React, { Component } from 'react';
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
			  this.setState({ participants: resData.participants });
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
			<div>
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
				{
					this.state.participants.map(user => (
						<Container style={{ padding: '8px', fontSize: '20px', border: '1px solid black'}}>
						  <Row>
						    <Col>
								 <p>{user.userId.name}</p>
								</Col>
								<Col>
								<Dropdown as={ButtonGroup}>
								 <Button>Questions</Button>
                <Dropdown.Toggle split id="dropdown-split-basic" />
                <Dropdown.Menu>
                {user.questions.map(q => (
								  <Dropdown.Item>
								   <Button variant="outline-primary" value={q.code} onClick={this.onShowCode}>
								    {q.questionId}
								   </Button>
								  </Dropdown.Item>
								))}
                </Dropdown.Menu>
                </Dropdown>
								</Col>
								<Col md="auto">
								<p style={{paddingLeft: '20px'}}>{user.totalScore}</p>
								</Col>
							</Row>
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
