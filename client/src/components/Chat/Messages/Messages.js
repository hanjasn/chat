import React from 'react';
import Message from './Message/Message';
import Input from './Input/Input';
import './Messages.css';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Scrollbar } from 'react-scrollbars-custom';

const Messages = ({
  roomName,
  users,
  messages,
  currentUsername,
  message,
  setMessage,
  sendMessage,
}) => {
  return (
    <Col>
      {/* top bar with name of room and other options */}
      <Row>
        <Col>{roomName || 'Choose a Room'}</Col>
      </Row>
      {/* messages displayed */}
      <Row>
        <div className="messages">
          <Scrollbar>
          {messages.map((message, i) => (
            <div key={i}>
              <Message message={message} currentUsername={currentUsername} />
            </div>
          ))}
          </Scrollbar>
        </div>
      </Row>
      {/* message input bar */}
      <Input message={message} setMessage={setMessage} sendMessage={sendMessage} />
    </Col>
  );
};

export default Messages;
