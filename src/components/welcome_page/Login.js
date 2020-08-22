import React from 'react'
import { Button, Container } from 'react-bootstrap'

export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email : '',
      password: '',
      userAdmin: 'admin'
    };
  }

  onRChange = (e) => {
    this.props.onRouteChange(e.target.value)
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
      <Container style={{ fontSize: '20px', marginTop: '40px', textAlign: 'center', marginBottom: '40px'}}>
          <h1>Login</h1>
          <hr />
          <label>
            Email:
            <br />
            <input 
              placeholder="user@sr.com" 
              name="email"
              type="text"
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
              type="text"
              value={this.state.password}
              onChange={this.onPasswordChange.bind(this)}
             />
          </label>
          <br/>
          <label>
            Login as:
            <select value={this.state.userAdmin} onChange={this.onUserAdminChange.bind(this)}>
              <option value="admin">Admin</option>
              <option value="user">User</option>
            </select>
          </label>
          <br />
          {
          this.state.userAdmin === 'admin'
          ?
          <Button variant="outline-primary" className='but' value="login" onClick={e => this.props.onAdminlogin(e, this.state)}>Login</Button>
          :
          <Button variant="outline-primary" className='but' value="login" onClick={e => this.props.onUserlogin(e, this.state)}>Login</Button>
          }
          <br />
          <Button variant="outline-primary" className='but' value='register' onClick={this.onRChange}>
          Register
          </Button>
      </Container>
    )
  }
}