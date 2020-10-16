import React from 'react'
import { Container, Form, Row, Col, Button } from 'react-bootstrap'

import ErrorHandler from '../error_handler/ErrorHandler'

class Addques extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			title: "",
			content: "",
			sinput: "",
			soutput: "",
			inputfile: "",
			outputfile: "",
			error: null
		};
		this.handler = this.handler.bind(this);
	}
	
	handle = (e) => {
		let status;
		const { title, content, sinput, soutput, inputfile, outputfile } = this.state;
		fetch('https://on-platform-api.herokuapp.com/feed/question', {
			method: 'POST',
			headers: {
				Authorization: 'Bearer ' + this.props.token,
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				title: title,
				content: content,
				sinput: sinput,
				soutput: soutput,
				inputfile: inputfile,
				outputfile: outputfile
			})
		})
		.then(res => {
			status=res.status;
			return res.json();
		})
		.then(resData => {
			if(status === 200) {
				this.props.history.push('/admin/questions');
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
	}

	handler(event) {
		const target = event.target ;
		const value = target.value ;
		const name = target.name ;
		this.setState ({
			[name] : value
		});
	}

	render() {
		return (
			<Container style={{ padding: '8px 50px'}}>
				<ErrorHandler error={this.state.error} onHandle={this.errorHandler} />
				<Form>
					<Form.Group controlId="exampleForm.ControlTextarea1">
						<Form.Label>Title</Form.Label>
						<Form.Control
							placeholder="Title"
							name="title"
							as="textarea"
							rows="1"
							value={this.state.title}
							onChange={this.handler}
						/>
					</Form.Group>
					<Form.Group controlId="exampleForm.ControlTextarea1">
						<Form.Label>Content</Form.Label>
						<Form.Control
							placeholder="Content"
							name="content"
							as="textarea"
							rows="5"
							value={this.state.content}
							onChange={this.handler}
						/>
					</Form.Group>
           <Row>
            <Col>
             <Form.Group controlId="exampleForm.ControlTextarea1">
             <Form.Label>Sample Input</Form.Label>
             <Form.Control 
              placeholder="Sample Input"
              name="sinput"
              as="textarea" 
              rows="2" 
              value={this.state.sinput}
						  onChange={this.handler}
             />
             </Form.Group>
            </Col>
            <Col>
             <Form.Group controlId="exampleForm.ControlTextarea1">
             <Form.Label>Sample Output</Form.Label>
             <Form.Control
              placeholder="Sample Output"
              name="soutput" 
              as="textarea" 
              rows="2" 
              value={this.state.soutput}
							onChange={this.handler}
              />
             </Form.Group>
            </Col>
           </Row>
           <Row>
            <Col>
             <Form.Group controlId="exampleForm.ControlTextarea1">
             <Form.Label>Input File</Form.Label>
             <Form.Control 
              placeholder="Input File"
              name="inputfile"
              as="textarea" 
              rows="3" 
              value={this.state.inputfile}
							onChange={this.handler} 
              />
             </Form.Group>
            </Col>
            <Col>
             <Form.Group controlId="exampleForm.ControlTextarea1">
             <Form.Label>Output File</Form.Label>
             <Form.Control 
              placeholder="Output File"
              name="outputfile"
              as="textarea" 
              rows="3" 
              value={this.state.outputfile}
							onChange={this.handler}  
							/>
             </Form.Group>
            </Col>
           </Row>
           <Form.Group style={{ textAlign: 'center' }}>
					  <Button onClick={this.handle}>ADD Question</Button>
					 </Form.Group>
					</Form>
			</Container>
		)
	}
}

export default Addques;
