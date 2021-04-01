import React from 'react';
import { Container } from 'react-bootstrap'

class Footer extends React.Component {
    render() {
        return (
            <Container fluid style={{ padding: '8px', margin: '0px', backgroundColor: 'black', color: 'white', textAlign: 'center' }}>
                <h1>Coding Life</h1>
                <p>© 2020 Platfrom-Up | All right reserved.</p>
            </Container>
        );
    }
}

export default Footer ;