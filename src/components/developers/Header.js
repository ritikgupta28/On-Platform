import React from 'react';
import { Container, Row, Col } from 'react-bootstrap'

class Header extends React.Component {
    render() {
        return(
            <Container fluid style={{ backgroundColor: 'rgb(7, 2, 15)'}}>
            <Row>
            <Col xs='5'>
             <h1 style={{ color: 'white'}}>Platform-Up</h1>
             </Col>
             <Col>
             <h1 style={{ color: 'white'}}>Developers</h1>
             </Col>
             </Row>
            </Container>
        );
    }
}

export default Header ;