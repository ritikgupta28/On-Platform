import React from 'react'
import { Spinner } from 'react-bootstrap'

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
      </div>
		)
	}
}