import React from 'react';
import sahil from '../images/sahil.jpg'
import ritik from '../images/ritik.jpg'
import Insta from '../images/instagram.jfif'
import linke from '../images/linkedin.png'
import gmail from '../images/gmail.png'
import { CardDeck, Card, Container, Row, Col, Image } from 'react-bootstrap'

const Cardlist = () => {
	 return (
	 	<Container style={{ padding: '0px 40px' }}>
	    <CardDeck style={{ margin: '60px'}}>
       <Card>
        <Card.Img style={{ height: '300px', padding: '20px'}} variant="top" src={sahil} />
        <Card.Body>
         <Card.Title>Sahil Goyal</Card.Title>
         <Card.Text>
          I am a student and enthusiastic to gain knowledge and always want to experience new things. 
          i always optimistic towards results.
         </Card.Text>
         <Row style={{padding: '0px 40px'}}>
          <Col>
           <a href='https://www.instagram.com/sahil.goyal25/'><Image style={{ height: '40px'}} src={Insta} roundedCircle /></a>
          </Col>
          <Col >
           <a href='https://www.linkedin.com/in/sahil-goyal-138b96175/'><Image style={{ height: '40px'}} src={linke} roundedCircle /></a>
          </Col>
          <Col >
           <a href='mailto: sahilgoyals1999@gmail.com'><Image style={{ height: '40px'}} src={gmail} roundedCircle /></a>
          </Col>
         </Row>
        </Card.Body>
       </Card>
       <Card>
        <Card.Img style={{ height: '300px',  padding: '20px'}} variant="top" src={ritik} />
        <Card.Body>
         <Card.Title>Ritik Gupta</Card.Title>
         <Card.Text>
          I am a student and enthusiastic to gain knowledge and always want to experience new things. 
          i always optimistic towards results.
         </Card.Text>
         <Row style={{padding: '0px 40px'}}>
          <Col>
           <a href='https://www.instagram.com/ritik__gupta_/'><Image style={{ height: '40px'}} src={Insta} roundedCircle /></a>
          </Col>
          <Col >
           <a href='https://www.linkedin.com/in/ritik-gupta-4756851a1/'><Image style={{ height: '40px'}} src={linke} roundedCircle /></a>
          </Col>
          <Col >
           <a href='mailto: ritikgupta2003@gmail.com'><Image style={{ height: '40px'}} src={gmail} roundedCircle /></a>
          </Col>
         </Row>
        </Card.Body>
       </Card>
      </CardDeck>
      </Container>
	 );
}

export default Cardlist;