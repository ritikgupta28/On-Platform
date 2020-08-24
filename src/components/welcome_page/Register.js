import React from 'react'
import { Container, Button, Form } from 'react-bootstrap'

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
      <Container style={{ padding: '30px 150px' }}>
          <h1 style={{ textAlign: 'center' }}>Register</h1>
          <hr />
          <Form>
           <Form.Group controlId="formBasicName">
            <Form.Label>Name</Form.Label>
            <Form.Control 
             type="text"
             placeholder="Name"
             value={this.state.name}
             onChange={this.onNameChange.bind(this)}
             />
           </Form.Group>
           <Form.Group controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control 
             type="email"
             placeholder="Enter email" 
             value={this.state.email}
             onChange={this.onEmailChange.bind(this)}
             />
            <Form.Text className="text-muted">
             We'll never share your email with anyone else.
            </Form.Text>
           </Form.Group>
           <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control 
             type="password"
             placeholder="Password"
             value={this.state.password}
             onChange={this.onPasswordChange.bind(this)}
             />
           </Form.Group>
           <Form.Group controlId="exampleForm.ControlSelect1">
            <Form.Label>Register As.</Form.Label>
            <Form.Control as="select" value={this.state.userAdmin} onChange={this.onUserAdminChange.bind(this)}>
             <option value="admin">Admin</option>
             <option value="user">User</option>
            </Form.Control>
           </Form.Group>
           <Form.Group style={{ textAlign: 'center' }}>
           {
            this.state.userAdmin === 'admin'
            ?
           <Button 
            variant="primary" 
            type="submit"
            onClick={e => this.props.onAdminsignup(e, this.state)}
            >
            Register
           </Button>
           :
           <Button 
            variant="primary" 
            type="submit"
            onClick={e => this.props.onUsersignup(e, this.state)}
            >
            Register
           </Button>
          }
          </Form.Group>
          </Form>
      </Container>
    )
  }
}