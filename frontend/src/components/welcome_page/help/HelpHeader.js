import React from 'react';
import { Container, Row, Col } from 'react-bootstrap'

class Header extends React.Component {
    render() {
        return (
            <Container fluid style={{ backgroundColor: 'black', color: 'white', padding: '10px' }}>
                <Row>
                    <Col xs='5'>
                        <h1>On-Platform</h1>
                    </Col>
                    <Col md="auto">
                        <h1>Help</h1>
                    </Col>
                </Row>
            </Container>
        );
    }
}

export default Header;