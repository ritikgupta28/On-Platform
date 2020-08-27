import React from 'react'
import Cardlist from  './Cardlist'
import Header from './Header'

export default class Developers extends React.Component {
	render() {
		return (
			<div>
			  <Header />
				<Cardlist />
			</div>
		)
	}
}