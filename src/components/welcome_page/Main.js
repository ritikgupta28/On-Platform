import React from 'react'

class Main extends React.Component {
   constructor(props) {
    super(props);
    this.state = {
      email : "",
      name : "",
      password: "",
      userAdmin: 'Admin'
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

  onC3 = (event) => {
    this.setState({ userAdmin: event.target.value})
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
                <option value="Admin">Admin</option>
                <option value="User">User</option>
                </select>
                </label>
                <br />
                <button className = "button" type="submit" value="Signup" onClick={e => this.props.onSignup(e, this.state)} >Sign Up</button>  
                <button className = "button" type="button" value="login" onClick={e => this.props.onlogin(e, this.state)} >login</button>
            </form>
        </div>
    )
  }
}

export default Main;
