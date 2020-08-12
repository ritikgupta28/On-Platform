import React from 'react'

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
      <div className='main'>
        <form className='form'>
          <h2>Register</h2>
          <hr />
          <label>
            Name: 
            <input 
              placeholder="user" 
              name = "name"
              type = "text"
              value = {this.state.name}
              onChange = {this.onNameChange.bind(this)}
             />
          </label>
          <br />
          <label>
            Email: 
            <input 
              placeholder="user@sr.com" 
              name = "email"
              type = "email"
              value = {this.state.email}
              onChange = {this.onEmailChange.bind(this)}
             />
          </label>
          <br />
          <label>
            Password: 
            <input 
              placeholder="password"
              name = "password"
              type = "password"
              value = {this.state.password}
              onChange = {this.onPasswordChange.bind(this)}
             />
          </label>
          <br/>
          <label>
            As a:
            <select className='userAdmin' value={this.state.userAdmin} onChange={this.onUserAdminChange.bind(this)}>
              <option value="admin">Admin</option>
              <option value="user">User</option>
            </select>
          </label>
          <br />
          {
          this.state.userAdmin === 'admin'
          ?
          <button className='button' value='register' onClick={e => this.props.onAdminsignup(e, this.state)} >Register</button>
          :
          <button className = "button" value='register' onClick={e => this.props.onUsersignup(e, this.state)} >Register</button>
          }
          <br />
          <button className='button' value='login' onClick={this.onRChange} >Login</button>
        </form>
      </div>
    )
  }
}