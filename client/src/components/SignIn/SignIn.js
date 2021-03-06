import React, { useState } from 'react';
import './SignIn.css';
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { Redirect } from 'react-router-dom';

const SignUp = ({ setUser }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    
    if (username.length === 0) {
      setErrorMessage('Username must be at least one character long');
    } else {
      axios.post('/signup', { username, password, confirmPassword }).then((res) => {
        if (res.data.user) {
          setUser(res.data.user);
        } else {
          setErrorMessage(res.data.message);
        }
      });
    }
  };

  return (
    <Col className="sign-up-form" md='3'>
      <div className='font-small'>{errorMessage}</div>
      <div className="header">Sign Up</div>
      <Form onSubmit={handleSubmit}>
        <Form.Group className='form-element' controlId="signup-username">
          <Form.Control
            type="text"
            name="username"
            placeholder="Username"
            onChange={(event) => setUsername(event.target.value)}
          />
        </Form.Group>
        <Form.Group className='form-element' controlId="signup-password">
          <Form.Control
            type="password"
            name="password"
            placeholder="Password"
            onChange={(event) => setPassword(event.target.value)}
          />
          <Form.Text className="font-small">
            Password must be at least 8 characters long
          </Form.Text>
        </Form.Group>
        <Form.Group className='form-element' controlId="form-confirm-password">
          <Form.Control
            type="password"
            name="confirm-password"
            placeholder="Confirm Password"
            onChange={(event) => setConfirmPassword(event.target.value)}
          />
        </Form.Group>
        <Button className="w-100" size="sm" variant="dark" type="submit">
          Sign Up
        </Button>
      </Form>
    </Col>
  );
};

const SignIn = ({ user, setUser }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!username || !password) {
      setErrorMessage('You must enter a username and password');
    } else {
      axios.post('/signin', { username, password }).then((res) => {
        if (res.data.user) {
          setUser(res.data.user); // redirects to '/chat' since user is not null
        } else {
          setErrorMessage(res.data.message);
        }
      });
    }
  };

  if (user) {
    return <Redirect to="/chat" />;
  }
  return (
    <Container fluid className='signin-container'>
      <Row className='d-flex justify-content-center'>
        <Col className="sign-in-form" md='3'>
          <div className='font-small'>{errorMessage}</div>
          <div className="header">Sign In</div>
          {/* <Form action='/signin' method='POST'> */}
          <Form onSubmit={handleSubmit}>
            <Form.Group className='form-element' controlId="signin-username">
              <Form.Control
                type="text"
                name="username"
                placeholder="Username"
                onChange={(event) => setUsername(event.target.value)}
              />
            </Form.Group>
            <Form.Group className='form-element' controlId="signin-password">
              <Form.Control
                type="password"
                name="password"
                placeholder="Password"
                onChange={(event) => setPassword(event.target.value)}
              />
            </Form.Group>
            <Button className="w-100" size="sm" variant="dark" type="submit">
              Sign In
            </Button>
          </Form>
        </Col>
        <SignUp setUser={setUser} />
      </Row>
    </Container>
  );
};

export default SignIn;
