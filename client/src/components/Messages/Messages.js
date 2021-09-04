import React from 'react';
import ScrollToBottom from 'react-scroll-to-bottom';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const Messages = ({ roomName, users, messages }) => {
  return (
    <Col className='border border-dark'>
      <Row> {/* top bar with name of room and other options */}
        <Col>{roomName}</Col>
      </Row>
      <Row> {/* messages displayed */}
        <ScrollToBottom>
          {}
        </ScrollToBottom>
      </Row>
      <Row> {/* message input bar */}
        
      </Row>
    </Col>
  );
};

export default Messages;