import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import Rooms from '../Rooms/Rooms';
import Messages from '../Messages/Messages';
import AddRoom from '../AddRoom/AddRoom';
import io from 'socket.io-client';
import axios from 'axios';
import './Chat.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';

let socket;

const Chat = ({ user, setUser }) => {
  const displays = {
    messages: 0,
    addRoom: 1,
  };

  const [rooms, setRooms] = useState([]);
  const [roomID, setRoomID] = useState('');
  const [roomName, setRoomName] = useState('');
  const [users, setUsers] = useState([]); // only usernames
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState(''); // TODO: when message is sent, send username and message to all users in room and store in database
  const [display, setDisplay] = useState(displays.messages);
  const ENDPOINT = 'http://localhost:5000';

  useEffect(() => {
    axios.get(`/rooms/${user.username}`).then((res) => {
      setRooms(res.data.rooms);
    });

    socket = io(ENDPOINT);
    socket.emit('join', user.rooms); // socket joins all rooms in user's rooms list

    return () => {
      socket.off();
    };
  }, []);

  const setCurrentRoom = (room) => {
    setRoomID(room.id);
    setRoomName(room.name);
    setUsers(room.users);
    setMessages(room.messages);
  };

  if (!user) {
    return <Redirect to="/signin" />;
  }
  return (
    <Container fluid className="chat-container">
      <Row className="chat-container-row">
        <Rooms
          displays={displays}
          setDisplay={setDisplay}
          rooms={rooms}
          setCurrentRoom={setCurrentRoom}
        />
        {display === displays.messages ? (
          <Messages roomName={roomName} users={users} messages={messages} />
        ) : (
          <AddRoom
            username={user.username}
            setUser={setUser}
            setRooms={setRooms}
            setRoomID={setRoomID}
            setRoomName={setRoomName}
            setUsers={setUsers}
            setMessages={setMessages}
            socket={socket}
            displays={displays}
            setDisplay={setDisplay}
          />
        )}
      </Row>
    </Container>
  );
};

export default Chat;
