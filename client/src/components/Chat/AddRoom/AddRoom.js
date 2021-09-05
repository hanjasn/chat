import React, { useState } from 'react';
import axios from 'axios';
import './AddRoom.css';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

const AddRoom = ({
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
    } = await axios.post('/addRoom', { username, roomName: newRoomName });
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
      <Form onSubmit={handleSubmit}>
        <Form.Group className="add-room-input w-50">
          <Form.Control
            type="text"
            name="room-name"
            placeholder="Room Name"
            onChange={(event) => setNewRoomName(event.target.value)}
          />
        </Form.Group>
        <Button variant="light" type="submit">
          Create Room
        </Button>
      </Form>
    </Col>
  );
};

export default AddRoom;
