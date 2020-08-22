import React from 'react';
import { Link } from 'react-router-dom'
import { Container, Row, Col, Button, Image } from 'react-bootstrap'
import logo from '../images/logo1.jpg'

class Header extends React.Component {
  render() {
    return (
      <Container fluid className='h'>
       <Row>
         <Col xs='2'>
          <Image className='logo' src={logo} rounded />
         </Col>
         <Col xs='8'>
         <h1>Welcome to Project Up</h1>
         </Col>
        <Col style={{ paddingTop: '30px'}}>
         <Link to='ide'> 
          <Button className='b'>Online IDE</Button>
         </Link>
         <Link to='developers'>
          <Button className='b'>Developers</Button>
         </Link>
        </Col>
        </Row>
      </Container>
    );
  }
}

export default Header;
