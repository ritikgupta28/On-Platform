import React from 'react';
import CodeMirror from 'react-codemirror';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/monokai.css';
import 'codemirror/mode/python/python';
import 'codemirror/mode/clike/clike';
import axios from 'axios';
import { Container, Form, Button, Row, Col } from 'react-bootstrap'
import './Ide.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: 'CodeMirror',
      result: '',
      language: 'text/x-c++src',
      code: '',
      output: false,
      inputShow: true
    };
    this.handleCompile = this.handleCompile.bind(this);
  }

  onLangChange = (e) => {
    this.setState({ 
      language: e.target.value
    })
    if(this.state.code === '') {
      if (this.state.language === 'text/x-c++src') {
        this.updateCode(`#include <iostream>
          using namespace std;
          int main() {
              cout<<"Hello World!";
          }`
        )
      }
      else {
        this.updateCode(`print("Hello World!")}`)
      }      
    }
  }

  updateCode(newCode) {
    this.setState({
      code: newCode,
    });
  }

  onInputDataChange = (e) => {
    this.setState({
      inputdata: e.target.value
    })
  }

  async handleCompile(e) {
    e.preventDefault();
    let script = this.state.code;
    let language = null;
    if (this.state.language === 'python') language = 'python3';
    else language = 'cpp';
    let stdin = this.state.inputdata;
    this.state.result = await axios.post('https://on-platform-api.herokuapp.com/ide/compile', {
      script,
      language,
      stdin
      }
    );
    this.setState({
      output: true
    });
  }

  render() {
    let options = {
      lineNumbers: true,
      mode: this.state.language,
      theme: 'monokai'
    };
    return (
      <Container style={{ marginTop: '50px'}}>
          <Form>
          <Row>
          <Col xs='4'>
           <Form.Group controlId="exampleForm.ControlSelect1">
            <Form.Label>Select Language.</Form.Label>
            <Form.Control as="select" value={this.state.language} onChange={this.onLangChange.bind(this)}>
             <option value="text/x-c++src">C++</option>
             <option value="python">Python</option>
            </Form.Control>
           </Form.Group>
           </Col>
           </Row>
          <Form.Group controlId="exampleForm.ControlSelect1">
            <CodeMirror
              value={this.state.code}
              onChange={this.updateCode.bind(this)}
              options={options}
              className="code"
            />
           </Form.Group>
           <Form.Group style={{ marginLeft: '20px' }}>
           <Row>
           <Col>
           <Row>
           <Form.Check onClick={() => this.setState({ inputShow: !this.state.inputShow })}/>
           <Form.Label>Input</Form.Label>
           </Row>
           </Col>
           <Col md="auto">
           <Button variant="outline-success" onClick={this.handleCompile}>Run Code</Button>
          </Col>
           </Row>
           </Form.Group>
           <Row>
           <Col>
           {this.state.inputShow && (
           <Form.Group controlId="exampleForm.ControlTextarea1">
           <Form.Control 
            placeholder="Enter input here"
            as="textarea" 
            rows="3" 
            name="input"
            value={this.state.inputdata}
            onChange={this.onInputDataChange}
            />
           </Form.Group>
           )}
           </Col>
          </Row>
          
          {this.state.output && (
            <Form.Group controlId="exampleForm.ControlTextarea1">
            <Form.Label>Output</Form.Label>
             <Form.Control 
              as="textarea" 
              rows="4" 
              name="output"
              value={this.state.result.data.body.output}
              />
           </Form.Group>
           )}
          </Form>
      </Container>
    );
  }
}

export default App;