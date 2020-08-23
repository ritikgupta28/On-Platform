import React from 'react'
import { Link } from 'react-router-dom'
import { Container } from 'react-bootstrap'

import ErrorHandler from '../error_handler/ErrorHandler'

class Addques extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			title : "",
			content : "",
			sinput: "",
			soutput: "",
			inputfile: "",
			outputfile: "",
			error: null
		};
		this.handler = this.handler.bind(this);
	}
	
	catchError = error => {
		this.setState({ error: error })
	}
	
	errorHandler = () => {
		this.setState({ error: null });
	};
	
	handle = (e) => {
		const { title, content, sinput, soutput, inputfile, outputfile } = this.state;
		fetch('http://localhost:8000/feed/question', {
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
				if (res.status !== 200) {
					throw new Error('error');
				}
				return res.json();
			})
		.catch(this.catchError);
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
			<Container style={{ fontSize: '20px', marginTop: '40px', textAlign: 'center', marginBottom: '40px'}}>
				<div className='ques'>
					<ErrorHandler error={this.state.error} onHandle={this.errorHandler} />
					<form className='fo'>
						Title:
						<textarea 
							rows="2"
							cols="40"
							placeholder='Enter title here...'
							name="title"
							value={this.state.title}
							onChange={this.handler}
						/>
						<br/>
						<br/>
						Content:
						<textarea 
							rows="6"
							cols="64"
							placeholder='Enter Question here...'
							name="content" 
							value={this.state.content}
							onChange={this.handler}
						/>
						<br/>
						<br/>
					<div style={{ display: 'flex', margin: '10px' }}>
						Sample Input:
						<textarea 
							rows="4"
							cols="32"
							placeholder='Sample Input...'
							name="sinput" 
							value={this.state.sinput}
							onChange={this.handler}
						/> 
						Sample Output:
						<textarea
							rows="4"
							cols="32"
							placeholder='Sample Output...'
							name="soutput" 
							value={this.state.soutput}
							onChange={this.handler}
						/>
					</div>
					<br/>
					<div style={{ display: 'flex', margin: '10px' }}>
						Input File:
						<br /> 
						<textarea
							rows="4"
							cols="32"
							name="inputfile"
							value={this.state.inputfile}
							onChange={this.handler} 
							placeholder="Enter input here.."
						/>
						 Output File:
						<textarea
							rows="4"
							cols="32"
							name="outputfile"
							value={this.state.outputfile}
							onChange={this.handler} 
							placeholder="Enter output here.."
						/>
						</div>
						<br /> 
						<Link to='/admin/questions'>
						<button className='but' value='pcon' type='submit' onClick={this.handle}>ADD Question</button>
						</Link>
				</form>
			</div>
			</Container>
		)
	}
}

export default Addques;
