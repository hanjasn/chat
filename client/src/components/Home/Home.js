import React from 'react';
import './Home.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';

const Home = () => (
  <Container fluid className='home-container vertical-center'>
    <Row>
      <div className='text-box'>Chat Application</div>
    </Row>
  </Container>
);

export default Home;