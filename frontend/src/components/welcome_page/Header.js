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
      <Container fluid style={{ padding: '8px', margin: '0px', backgroundColor: 'black', color: 'white' }}>
       <Row>
        <Col>
         <h1>On-Platform</h1>
        </Col>
        <Col md="auto">
        <Nav fill>
          <Nav.Link href="/ide">
           <Button>IDE</Button>
          </Nav.Link>
          <Nav.Link href="/developers">
           <Button>Developers</Button>
          </Nav.Link>
          <Nav.Link href="/contact">
           <Button>Contact Us</Button>
          </Nav.Link>
          <Nav.Link href="/help">
           <Button>Help</Button>
          </Nav.Link>
         <Nav.Link>
          <Button onClick={this.onRChange}>{this.state.route}</Button>
         </Nav.Link>
         </Nav>
         </Col>
        </Row>
      </Container>
    );
  }
}

export default Header;
