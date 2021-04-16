import React from 'react';
import { Container } from 'react-bootstrap'

class Footer extends React.Component {
    render() {
        return (
            <Container fluid style={{ padding: '8px', margin: '0px', backgroundColor: 'black', color: 'white', textAlign: 'center' }}>
                <h1>Made by Sahil and Ritik</h1>
                <p>© 2020 Platfrom-Up | All right reserved.</p>
            </Container>
        );
    }
}

export default Footer ;