import React from 'react'

class Main extends React.Component {
   constructor(props) {
    super(props);
    this.state = {
      email : "",
      name : "",
      password: "",
      userAdmin: 'admin'
    };
    this.handler = this.handler.bind(this);
  }

  handler(event) {
    const target = event.target ;
    const value = target.value ;
    const name = target.name ;
    
    this.setState ({
      [name] : value
    });
  }

  onC3 = (e) => {
    this.setState({
      userAdmin: e.target.value
    })
    this.props.onChangeUserAdmin(e.target.value);
  }

  render() {
    return (
      <div className = "main">
        <form className = "form">
          <h3>Sign Up</h3>
          <hr />
          <label>
            Name: 
            <input 
              placeholder="Name"
              name = "name"
              type = "text"
              value = {this.state.name}
              onChange = {this.handler}/>
          </label>
          <br />
          <label>
            Email: 
            <input 
              placeholder="user@ssr.com" 
              name = "email"
              type = "text"
              value = {this.state.email}
              onChange = {this.handler}/>
          </label>
          <br />
          <label>
            Password: 
            <input 
              placeholder="password"
              name = "password"
              type = "text"
              value = {this.state.password}
              onChange = {this.handler}/>
          </label>
          <br/>
          <label>
            As a:
            <select className='userAdmin' value={this.state.userAdmin} onChange={this.onC3}>
              <option value="admin">Admin</option>
              <option value="user">User</option>
            </select>
          </label>
          <br />
          {
          this.state.userAdmin === 'admin'
          ?
          <div>
          <button className = "button" type="submit" value="signup" onClick={e => this.props.onAdminsignup(e, this.state)} >Sign Up</button>  
          <button className = "button" type="button" value="login" onClick={e => this.props.onAdminlogin(e, this.state)} >Login</button>
          </div>
          :
          <div>
          <button className = "button" type="submit" value="signup" onClick={e => this.props.onUsersignup(e, this.state)} >Sign Up</button>  
          <button className = "button" type="button" value="login" onClick={e => this.props.onUserlogin(e, this.state)} >Login</button>
          </div>
        }
        </form>
      </div>
    )
  }
}

export default Main;
