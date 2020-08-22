import React from 'react'
import { Container, Button } from 'react-bootstrap'

export default class Register extends React.Component {
	constructor(props) {
    super(props);
    this.state = {
      name: '',
      email : '',
      password: '',
      userAdmin: 'admin'
    };
  }

  onRChange = (e) => {
    this.props.onRouteChange(e.target.value)
  }

  onNameChange = (e) => {
    this.setState ({
      name : e.target.value
    });
  }

  onEmailChange = (e) => {
    this.setState ({
      email : e.target.value
    });
  }

  onPasswordChange = (e) => {
    this.setState ({
      password: e.target.value
    });
  }

  onUserAdminChange = (e) => {
  	this.setState({
  		userAdmin: e.target.value
  	})
    this.props.onChangeUserAdmin(e.target.value);
  }

  render() {
    return (
      <Container style={{ fontSize: '20px', marginTop: '40px', textAlign: 'center', marginBottom: '40px' }}>
          <h1>Register</h1>
          <hr />
          <label>
            Name: 
            <br/>
            <input 
              placeholder="user" 
              name="name"
              type="text"
              value={this.state.name}
              onChange={this.onNameChange.bind(this)}
             />
          </label>
          <br />
          <label>
            Email:
            <br/> 
            <input 
              placeholder="user@sr.com" 
              name="email"
              type="email"
              value={this.state.email}
              onChange={this.onEmailChange.bind(this)}
             />
          </label>
          <br />
          <label>
            Password: 
            <br/>
            <input 
              placeholder="password"
              name="password"
              type="password"
              value={this.state.password}
              onChange={this.onPasswordChange.bind(this)}
             />
          </label>
          <br/>
          <label>
            Register as:
            <select value={this.state.userAdmin} onChange={this.onUserAdminChange.bind(this)}>
              <option value="admin">Admin</option>
              <option value="user">User</option>
            </select>
          </label>
          <br />
          {
          this.state.userAdmin === 'admin'
          ?
          <Button variant="outline-primary" className='but' value='register' onClick={e => this.props.onAdminsignup(e, this.state)} >Register</Button>
          :
          <Button variant="outline-primary" className='but' value='register' onClick={e => this.props.onUsersignup(e, this.state)} >Register</Button>
          }
          <br />
          <Button variant="outline-primary" className='but' value='login' onClick={this.onRChange}>
          Login
          </Button>
      </Container>
    )
  }
}