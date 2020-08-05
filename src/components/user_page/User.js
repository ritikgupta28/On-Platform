import React from 'react';
import CodeMirror from 'react-codemirror';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/monokai.css';
import 'codemirror/mode/python/python';
import 'codemirror/mode/clike/clike';
import axios from 'axios';

import Welcome from './Welcome';
import Dropdown from './Dropdown';
import Output from './Output';
import './User.css';

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
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  updateCode(newCode) {
    this.setState({
      code: newCode
    });
  }

  getData(lang) {
    this.setState({
      language: lang
    });
  }
  async handleSubmit(e) {
    e.preventDefault();
    let script = this.state.code;
    let language = null;
    if (this.state.language === 'python') language = 'python3';
    else language = 'cpp';
    let stdin = e.target.elements.input.value;

    this.state.result = await axios.post('http://localhost:8000', {
      script,
      language,
      stdin
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
        <Welcome />
        <div className="con">
          <Dropdown sendData={this.getData.bind(this)} />
          <hr />
          <form onSubmit={this.handleSubmit}>
            <CodeMirror
              value={this.state.code}
              onChange={this.updateCode.bind(this)}
              options={options}
              className="code"
            />
            {' '}
            <br />
            <textarea
              rows="4"
              cols="50"
              name="input"
              placeholder="Enter input here..."
            />{' '}
            <br />
            <button className="bu">Compile</button>
            <button className="bu">Submit</button>
          </form>
          <br />

          {this.state.output ? (
            <div>
              <hr /> <Output result={this.state.result} />
            </div>
          ) : null}
        </div>
      </div>
    );
  }
}

export default App;
