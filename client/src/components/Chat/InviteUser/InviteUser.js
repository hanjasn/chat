import React, { useState, useEffect } from 'react';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

/**
 * Pre-requisites:
 *   Using Socket.IO:
 *     In Chat.js useEffect, emit 'connected' event and send username
 *     In index.js, listen for 'connected' event and add { username, socketid: socket.id } to clients array
 *     In Chat.js useEffect return, emit 'disconnected' event and send username
 *     In index.js, listen for 'disconnected' event and remove user from clients array
 *
 * Procedure:
 *   Emit 'invite' event and send { username, room.id }
 *   In database:
 *     Add room id to user's invitedRooms list
 *   Get socket.id of username from clients array
 *   Emit 'invite' event to socket.id
 *   When 'invite' event is received, get User from server so that User state is updated
 */
const InviteUser = ({ roomInvite, socket, setDisplay, displays }) => {
  const [username, setUsername] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    setUsername('');
    setErrorMessage('');
  }, [roomInvite]);

  const handleSubmit = (event) => {
    event.preventDefault();

    socket.emit('invite', { username, roomInviteID: roomInvite.id }, (error) => {
      if (error) {
        setErrorMessage(error);
      } else {
        setDisplay(displays.messages);
      }
    });
  };

  return (
    <Col>
      <div>{errorMessage}</div>
      <div>{roomInvite.name}</div>
      <Form className="w-50" onSubmit={handleSubmit}>
        <Form.Group className="add-room-input">
          <Form.Control
            type="text"
            name="username"
            placeholder="Username"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
          />
        </Form.Group>
        <Button className="w-100" variant="light" type="submit">
          Invite User
        </Button>
      </Form>
    </Col>
  );
};

export default InviteUser;
