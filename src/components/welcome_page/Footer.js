import React from 'react';
import { Container } from 'react-bootstrap'

class Footer extends React.Component {
    render() {
        return(
            <Container fluid className='h' style={{ textAlign: 'center', marginTop: '10px', padding: '10px' }}>
                <h1>Contact Us.</h1>
            </Container>
        );
    }
}

export default Footer ;