import React from 'react'

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
      <div className='main'>
        <form className='form'>
          <h3>Login</h3>
          <hr />
          <label>
            Email:
            <br />
            <input 
              placeholder="user@sr.com" 
              name = "email"
              type = "text"
              value = {this.state.email}
              onChange = {this.onEmailChange.bind(this)}
             />
          </label>
          <br />
          <label>
            Password: 
            <br/>
            <input 
              placeholder="password"
              name = "password"
              type = "text"
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
          <button className='button' value="login" onClick={e => this.props.onAdminlogin(e, this.state)} >Login</button>
          :
          <button className = "button" value="login" onClick={e => this.props.onUserlogin(e, this.state)} >Login</button>
          }
          <br />
          <button className='button' value='register' onClick={this.onRChange} >Register</button>
        </form>
      </div>
    )
  }
}