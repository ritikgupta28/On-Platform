import React from 'react';
import { Link } from 'react-router-dom'
import { Container, Row, Col, Button } from 'react-bootstrap'
import logo from '../images/logo1.jpg'

class Header extends React.Component {
  onRChange = (e) => {
    this.props.onRouteChange(e.target.value)
  }
  render() {
    return (
      <Container fluid className='h'>
       <Row>
         <Col>
          <h1>Platform-Up</h1>
         </Col>
        <Col style={{ paddingTop: '30px'}}>
         <Link to='ide'> 
          <Button variant="secondary" className='b'>Online IDE</Button>
         </Link>
         <Link to='developers'>
          <Button variant="secondary" className='b'>Developers</Button>
         </Link>
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
