import React, { useState } from 'react';
import axios from 'axios';
import './CreateRoom.css';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

const CreateRoom = ({
  username,
  setUser,
  setRooms,
  setRoomID,
  setRoomName,
  setUsers,
  setMessages,
  socket,
  displays,
  setDisplay,
}) => {
  const [newRoomName, setNewRoomName] = useState('');

  // Add to database and return room object
  // Add room id to user's rooms list
  // Add room to rooms list as an object
  // Set current room to the newly created room
  // Join room with socket
  // Change display to displays.messages
  const handleSubmit = async (event) => {
    event.preventDefault();

    const {
      data: { room },
    } = await axios.post('/createRoom', { username, roomName: newRoomName });
    setUser((user) => {
      return {
        ...user,
        rooms: [...user.rooms, { id: room.id }],
      };
    });
    setRooms((rooms) => [...rooms, room]);
    setRoomID(room.id);
    setRoomName(room.name);
    setUsers(room.users);
    setMessages(room.messages);
    socket.emit('join', [{ id: room.id }]);
    setDisplay(displays.messages);
  };

  return (
    <Col>
      <Form className='w-50' onSubmit={handleSubmit}>
        <Form.Group className="add-room-input">
          <Form.Control
            type="text"
            name="room-name"
            placeholder="Room Name"
            value={newRoomName}
            onChange={(event) => setNewRoomName(event.target.value)}
          />
        </Form.Group>
        <Button className='w-100' variant="light" type="submit">
          Create Room
        </Button>
      </Form>
    </Col>
  );
};

export default CreateRoom;
