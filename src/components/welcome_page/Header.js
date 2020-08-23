import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Button } from 'react-bootstrap';

class Header extends React.Component {
  onRChange = (e) => {
    this.props.onRouteChange(e.target.value)
  }
  render() {
    return (
      <Container fluid className='h'>
       <Row>
         <Col xs='7'>
          <h1>Platform-Up</h1>
         </Col>
        <Col xs='1'>
         <Link to='ide'> 
          <Button variant="secondary" className='b'>IDE</Button>
         </Link>
         </Col>
         <Col xs='2' >
         <Link to='developers'>
          <Button variant="secondary" className='b'>Developers</Button>
         </Link>
         </Col>
         <Col xs='1'>
         {
          this.props.route === 'login'
          ?
          <Button variant="secondary" className='b' value='register' onClick={this.onRChange}>Register</Button>
          :
          <Button variant="secondary" className='b' value='login' onClick={this.onRChange}>Login</Button>
         }
        </Col>
        </Row>
      </Container>
    );
  }
}

export default Header;
