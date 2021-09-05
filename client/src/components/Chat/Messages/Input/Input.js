import React from 'react';
import './Input.css';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

const Input = ({ message, setMessage, sendMessage }) => {
  return (
    <Form onSubmit={sendMessage}>
      <Row>
        <Col md='10'>
          <Form.Control 
            type='text'
            placeholder="Type a message..."
            value={message}
            onChange={(event) => setMessage(event.target.value)}
          />
        </Col>
        <Col>
          <Button type='submit'>Send</Button>
        </Col>
      </Row>
    </Form>
  );
};

export default Input;