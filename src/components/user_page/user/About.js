import React from 'react'
import { Container, Spinner, Image } from 'react-bootstrap'
import svg from '../../svg/about.svg'

export default class About extends React.Component {
	constructor() {
		super();
		this.state = {
		loading: true
	}
	}

	componentDidMount() {
		setTimeout(() => {
			this.setState({ loading: false })
		}, 3000);
	}
	
	render() {
		return (
			<Container style={{ marginTop: '10px', textAlign: 'center' }}>
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
      <h1>User</h1>
      <Image src={svg} rounded style={{ height: '400px'}} />
      </Container>
		)
	}
}