import React from 'react'
import Card from './Card'

export default class PreviosContest extends React.Component {
	constructor(props) {
    super(props);
    this.state = {
			allcontest: []
		}
	};

	componentDidMount() {
		fetch('http://localhost:8000/feed/allcontest', {
			headers: {
				Authorization: 'Bearer ' + this.props.token,
				'Content-Type': 'application/json'
      }
    })
	.then(res => res.json())
			.then(resData=> {
				console.log(resData.allcontest);
				this.setState({
					allcontest: resData.allcontest
				});
			})
			.catch(err => console.log(err));
	};

	render() {
		return (
			<div className='pcon'>
				<h1>All Contest</h1>
				<hr />
				{
					this.state.allcontest.map(i => (
						<Card
						sign={'Host'}
						key={i._id}
						title={i._id}
						id={i._id}
						/>
					))
				}
			</div>
		)
	}
}