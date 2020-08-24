import React from 'react';
import { Container, Row, Col, Button, Nav } from 'react-bootstrap';

class Header extends React.Component {
  onRChange = (e) => {
    this.props.onRouteChange(e.target.value)
  }
  render() {
    let route;
      if(this.props.route === 'login') { 
        route = 'Register'
      } else {
      route = 'Login'
      }
    return (
      <Container fluid className='h'>
       <Row>
       <Col xs='9'>
        <h1>Platform-Up</h1>
        </Col>
        <Nav variant="tabs">
         <Nav.Item>
          <Nav.Link href="/ide">IDE</Nav.Link>
         </Nav.Item>
         <Nav.Item>
          <Nav.Link href="/developers">Developers</Nav.Link>
         </Nav.Item>
         <Nav.Item>
          <Button value='register' onClick={this.onRChange}>{route}</Button>
         </Nav.Item>
         </Nav>
        </Row>
      </Container>
    );
  }
}

export default Header;
