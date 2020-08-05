import React from 'react'
import { Link } from 'react-router-dom'

class Addques extends React.Component {
	constructor(props) {
    super(props);
    this.state = {
      title : "",
      content : "",
      sinput: "",
      soutput: "",
    };
    this.handler = this.handler.bind(this);
  }

	handle = (e) => {
    fetch('http://localhost:8000/feed/question', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        title: this.state.title,
        content: this.state.content,
        sinput: this.state.sinput,
        soutput: this.state.soutput
      })
    })
    .then(response => response.json())
    .then(data => {
    	console.log(data);
    })
    .catch(err => console.log(err));
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
			 <div className='ques'>
			  <form className='fo'>
			  <label>
			   Title:
			   <br />
			   <textarea 
			   placeholder='Enter title here...'
			   className='title'
			   type="text" 
			   name="title"
			   value = {this.state.title}
               onChange = {this.handler}
                />
			   </label>
			   <br />
			   <label>
			    Content:
			    <br />
				<textarea 
				placeholder='Enter Question here...'
				className='content' 
				type="text" 
				name="content" 
				value = {this.state.content}
                onChange = {this.handler}
                />
				</label>
				<br />
				<label>
				Input:
				<textarea 
				placeholder='Sample Input...'
				className='sio'
				type="text" 
				name="sinput" 
				value = {this.state.sinput}
                onChange = {this.handler}
				/> 
				Output:
				<textarea
				placeholder='Sample Output...'
				className='sio'
				type="text" 
				name="soutput" 
				value = {this.state.soutput}
                onChange = {this.handler}
                />
				</label>
				<div style={{ padding: '5px', margin: '20px'}}>
				<label>Input File: <input type='file' name='Input File' /></label>
			    <label>Output File: <input type='file' name='Output File' /></label>
			    </div>
			    <Link to='/Admin'> 
			    <button className='but' value='pcon' type='submit' onClick={this.handle}>ADD Question</button>
			    </Link>
			   </form>
			 </div>
		)
	}
}

export default Addques;