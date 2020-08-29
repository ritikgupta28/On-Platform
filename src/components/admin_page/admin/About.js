import React from 'react'
import { Container, Spinner, Image, Form, Row, Col } from 'react-bootstrap'
import svg from '../../svg/about.svg'
import ErrorHandler from '../../error_handler/ErrorHandler'

export default class About extends React.Component {
	constructor() {
		super();
		this.state = {
			id: '',
			name: '',
			email: '',
			error: null,
			loading: true
	  }
	}

	componentDidMount() {
		let status;
		fetch('http://localhost:8000/findAdmin', {
			headers : {
				Authorization: 'Bearer ' + this.props.token,
				'Content-Type': 'application/json'
			}
		})
		.then(res => {
			status=res.status;
			return res.json();
		})
		.then(resData => {
			this.setState({ loading: false })
			if(status === 200) {
				this.setState({
					id: resData.id,
					name: resData.name,
					email: resData.email,
				})
			}
			else {
				throw new Error(resData.message);
			}
		})
		.catch(this.catchError);
	}

	catchError = (error) => {
		this.setState({ error: error })
	}

	errorHandler = () => {
		this.setState({ error: null });
	}

	handler(e) {
		const name = e.target.name ;
		this.setState ({
			[name] : this.state.[name]
		});
	}
	
	render() {
		return (
			<Container style={{ marginTop: '10px' }}>
			<ErrorHandler error={this.state.error} onHandle={this.errorHandler} />
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
      <h1 style={{ textAlign: 'center' }}>Admin</h1>
      <Row>
       <Col md="auto">
        <Image src={svg} rounded style={{ height: '400px'}} />
       </Col>
       <Col>
        <Form>
         <Form.Group controlId="exampleForm.ControlTextarea1">
            <Form.Label>ID</Form.Label>
             <Form.Control 
              as="textarea" 
              rows="1" 
              name="id"
              value={this.state.id}
              onChange={this.handler.bind(this)}
             />
            <Form.Label>Name</Form.Label>
             <Form.Control 
              as="textarea" 
              rows="1"
              name="name"
              value={this.state.name}
              onChange={this.handler.bind(this)}
             />
             <Form.Label>Email</Form.Label>
             <Form.Control 
              as="textarea" 
              rows="1"
              name="email"
              value={this.state.email}
              onChange={this.handler.bind(this)}
             />
          </Form.Group>
        </Form>
       </Col>
      </Row>
      </Container>
		)
	}
}