import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import Rooms from './Rooms/Rooms';
import Messages from './Messages/Messages';
import CreateRoom from './CreateRoom/CreateRoom';
import InviteUser from './InviteUser/InviteUser';
import io from 'socket.io-client';
import axios from 'axios';
import './Chat.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

let socket;

const Chat = ({ user, setUser }) => {
  const ENDPOINT = 'http://localhost:5000';
  const displays = {
    messages: 0,
    createRoom: 1,
    inviteUser: 2,
  };

  const [rooms, setRooms] = useState([]); // { id, name, users, messages }
  const [invitedRooms, setInvitedRooms] = useState([]); // { id, name, users }
  const [roomID, setRoomID] = useState();
  const [roomName, setRoomName] = useState('');
  const [users, setUsers] = useState([]); // usernames
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');
  const [roomInvite, setRoomInvite] = useState();
  const [display, setDisplay] = useState(displays.messages);

  // If user changes, rooms and invitedRooms will update as well
  useEffect(() => {
    if (!user) {
      return;
    }

    (async () => {
      let res = await axios.get(`/rooms/${user.username}`);
      setRooms(res.data.rooms);
      res = await axios.get(`/invitedRooms/${user.username}`);
      setInvitedRooms(res.data.invitedRooms);
    })();

    socket = io(ENDPOINT);
    socket.emit('connected', user.username); // id changes every time useEffect runs
    socket.emit('join', user.rooms); // socket joins all rooms in user's rooms list

    return () => {
      socket.emit('disconnected', user.username);
      socket.off();
    };
  }, [user]);

  useEffect(() => {
    socket.on('message', ({ messageRoomID, username, text }) => {
      setRooms(
        rooms.map((room) =>
          room.id === messageRoomID
            ? { ...room, messages: [...room.messages, { username, text }] }
            : room
        )
      );

      if (messageRoomID === roomID) {
        setMessages((messages) => [...messages, { username, text }]);
      }
    });

    socket.on('invited', () => {
      axios.get(`/user/${user.username}`).then((res) => {
        setUser(res.data.user);
      });
    });

    return () => {
      socket.off('message');
      socket.off('invited');
    };
  });

  const setCurrentRoom = (room) => {
    if (!room) {
      setRoomID();
      setRoomName('');
      setUsers([]);
      setMessages([]);
    } else {
      setRoomID(room.id);
      setRoomName(room.name);
      setUsers(room.users);
      setMessages(room.messages);
    }
  };

  const sendMessage = (event) => {
    event.preventDefault();

    if (message) {
      socket.emit('sendMessage', {
        messageRoomID: roomID,
        username: user.username,
        text: message,
      });
      setMessage('');
    }
  };

  if (!user) {
    return <Redirect to="/signin" />;
  }
  return (
    <Container fluid className="chat-container">
      <Row className="chat-container-row">
        <Rooms
          setDisplay={setDisplay}
          displays={displays}
          rooms={rooms}
          invitedRooms={invitedRooms}
          setCurrentRoom={setCurrentRoom}
          setRoomInvite={setRoomInvite}
          user={user}
          setUser={setUser}
          socket={socket}
        />
        {display === displays.messages ? (
          <Messages
            roomName={roomName}
            users={users}
            messages={messages}
            currentUsername={user.username}
            message={message}
            setMessage={setMessage}
            sendMessage={sendMessage}
          />
        ) : display === displays.createRoom ? (
          <CreateRoom
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
        ) : display === displays.inviteUser ? (
          <InviteUser
            roomInvite={roomInvite}
            socket={socket}
            setDisplay={setDisplay}
            displays={displays}
          />
        ) : (
          <Col>error: display does not exist</Col>
        )}
      </Row>
    </Container>
  );
};

export default Chat;
