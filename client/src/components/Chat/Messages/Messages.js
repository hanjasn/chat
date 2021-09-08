import React, { useEffect, useRef } from 'react';
import Message from './Message/Message';
import Input from './Input/Input';
import Users from './Users/Users';
import './Messages.css';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Scrollbar } from 'react-scrollbars-custom';

const Messages = ({
  roomName,
  users,
  showUsers,
  setShowUsers,
  messages,
  currentUsername,
  message,
  setMessage,
  sendMessage,
}) => {
  const messagesEndRef = useRef();

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <Col>
        {/* top bar with name of room and other options */}
        <Row>
          <Col>{roomName || 'Choose a Room'}</Col>
        </Row>
        {/* messages displayed */}
        <Row>
          <Col className="messages">
            <Scrollbar style={{ width: '101.3%' }} /* className styling doesn't work */>
              {messages.map((message, i) => (
                <div key={i}>
                  <Message message={message} currentUsername={currentUsername} />
                </div>
              ))}
              <div ref={messagesEndRef} />
            </Scrollbar>
          </Col>
        </Row>
        {/* message input bar */}
        <Input message={message} setMessage={setMessage} sendMessage={sendMessage} />
      </Col>
      {showUsers && <Users users={users} setShowUsers={setShowUsers} />}
    </>
  );
};

export default Messages;
