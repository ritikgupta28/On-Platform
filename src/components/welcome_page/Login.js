import React from 'react'
import { Button, Container, Form, Row, Image, Col } from 'react-bootstrap'
import svg from '../svg/login.svg'

export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email : '',
      password: '',
      userAdmin: 'admin'
    };
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
      <Container style={{ marginTop: '40px', marginBottom: '40px' }}>
        <h1 style={{ textAlign: 'center', fontSize: '70px' }}>Login</h1>
        <hr />
        <Row>
        <Col md="auto">
         <Image style={{ height: '350px'}} src={svg} rounded />
         </Col>
         <Col>
          <Form>
           <Form.Group controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control 
             type="email"
             placeholder="Enter email" 
             value={this.state.email}
             onChange={this.onEmailChange.bind(this)}
             />
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
            <Form.Label>Login As.</Form.Label>
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
            onClick={e => this.props.onAdminlogin(e, this.state)}
            >
            Login
           </Button>
           :
           <Button 
            variant="primary" 
            type="submit"
            onClick={e => this.props.onUserlogin(e, this.state)}
            >
            Login
           </Button>
          }
          </Form.Group>
          </Form>
          </Col>
          </Row>
      </Container>
    )
  }
}