import React from 'react';
import { Container, Row, Col, Button, Nav } from 'react-bootstrap';

class Header extends React.Component {
  state = {
    route: 'Register'
  }

  onRChange = (e) => {
    if(this.state.route === 'Login') {
      this.setState({ route: 'Register' })
      this.props.onRouteChange('login')
    } else {
      this.setState({ route: 'Login' })
      this.props.onRouteChange('register')
    }
  }
  render() {
    return (
      <Container fluid style={{ padding: '10px', backgroundColor: 'black', color: 'white' }}>
       <Row>
       <Col xs='9'>
        <h1>Platform-Up</h1>
        </Col>
        <Nav fill variant="tabs">
         <Nav.Item>
          <Nav.Link href="/ide">IDE</Nav.Link>
         </Nav.Item>
         <Nav.Item>
          <Nav.Link href="/developers">Developers</Nav.Link>
         </Nav.Item>
         <Nav.Item>
          <Button onClick={this.onRChange}>{this.state.route}</Button>
         </Nav.Item>
         </Nav>
        </Row>
      </Container>
    );
  }
}

export default Header;
