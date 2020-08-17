import React from 'react';
import CodeMirror from 'react-codemirror';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/monokai.css';
import 'codemirror/mode/python/python';
import 'codemirror/mode/clike/clike';
import axios from 'axios';

import Dropdown from './Dropdown';
import Output from './Output';
import './Ide.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: 'CodeMirror',
      result: '',
      code: "",
      language: '',
      output: false
    };
    this.handleCompile = this.handleCompile.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
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
  getData(lang) {
    this.setState({
      language: lang
    });
  }
  async handleCompile(e) {
    e.preventDefault();
    let script = this.state.code;
    let language = null;
    if (this.state.language === 'python') language = 'python3';
    else language = 'cpp';
    let stdin = this.state.inputdata;
    console.log(this.props.token);
    this.state.result = await axios.post('http://localhost:8000/ide', {
      headers: {
        Authorization: 'Bearer ' + this.props.token,
        'Content-Type': 'application/json'
      },
      script,
      language,
      stdin
    });
    this.setState({
      output: true
    });
  }

  async handleSubmit(e) {
    let script = this.state.code;
    let language = null;
    if (this.state.language === 'python') language = 'python3';
    else language = 'cpp';
    let questionId = this.props.questionId;
    this.state.result = await axios.post('http://localhost:8000/ide/input', {
      headers: {
        Authorization: 'Bearer ' + this.props.token,
        'Content-Type': 'application/json'
      },
      script,
      language,
      questionId
    });
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
      <div style={{ textAlign: 'center', paddingLeft: '150px', paddingRight: '150px'}}>
        <div className="con">
          <Dropdown sendData={this.getData.bind(this)} />
          <hr />
          <form >
            <CodeMirror
              value={this.state.code}
              onChange={this.updateCode.bind(this)}
              options={options}
              className="code"
            />
            {' '}
            <br />
            <textarea
              style={{ float: 'left' }}
              rows="5"
              cols="60"
              name="input"
              value={this.state.inputdata}
              onChange={this.onInputDataChange}
              placeholder="Enter input here.."
            />{' '}
            <button className="bu" onClick={this.handleCompile}>Compile</button>
            <button className="bu" onClick={this.handleSubmit}>Submit</button>
          </form>
          <br />
          {
            this.state.output 
            ? 
            (
            <div>
              <hr/>
              <Output result={this.state.result} />
            </div>
            ) 
            : null
          }
        </div>
      </div>
    );
  }
}

export default App;