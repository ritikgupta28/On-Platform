import React from 'react';
import { Container } from 'react-bootstrap'

class Footer extends React.Component {
    render() {
        return (
            <Container fluid style={{ padding: '10px', backgroundColor: 'black', color: 'white', textAlign: 'center' }}>
                <h1>Contact Us.</h1>
                <p>© 2020 Platfrom-Up | All right reserved.</p>
            </Container>
        );
    }
}

export default Footer ;