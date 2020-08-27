import React, { Component, Fragment } from 'react';
import Card from './Card'
import ErrorHandler from '../../error_handler/ErrorHandler'
import { Spinner } from 'react-bootstrap'

class FinalContest extends Component {
	constructor(props) {
    super(props);
    this.state = {
    	loading: true,
			finalcontest: [],
			error: null
		}
	};

  componentDidMount() {
		fetch('http://localhost:8000/feed/userfinalcontest', {
			headers: {
				Authorization: 'Bearer ' + this.props.token,
				'Content-Type': 'application/json'
			}
		})
		.then(res => {
			if (res.status !== 200) {
				throw new Error('error');
			}
			return res.json();
		})
		.then(resData=> {
			this.setState({
				finalcontest: resData.finalcontest,
				loading: false
			});
		})
		.catch(this.catchError);
	};

	catchError = error => {
		this.setState({ error: error })
	}

	errorHandler = () => {
		this.setState({ error: null });
	};

	render() {
		return (
			<Fragment>
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
				<ErrorHandler error={this.state.error} onHandle={this.errorHandler} />
				{
					this.state.finalcontest.map(contest => (
					<Card
					  path={`/finalcontest/questions/${contest._id}`}
						key={contest._id}
						title={contest.contestName}
						id={contest._id}
						questions={contest.questions}
						admin={contest.admin.name}
					/>
				  ))
				}
			</Fragment>
		)
	}
}

export default FinalContest;
