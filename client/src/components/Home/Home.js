import React from 'react';
import './Home.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';

const Home = () => (
  <Container fluid className='home-container vertical-center'>
    <Row>
      <h1>Chat Application</h1>
    </Row>
  </Container>
);

export default Home;