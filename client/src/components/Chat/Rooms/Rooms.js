import React, { useState } from 'react';
import ChatRooms from './ChatRooms/ChatRooms';
import InvitedRooms from './InvitedRooms/InvitedRooms';
import './Rooms.css';

const Rooms = ({
  setDisplay,
  displays,
  rooms,
  invitedRooms,
  setCurrentRoom,
  setRoomInvite,
  user,
  setUser,
  socket,
}) => {
  const roomsDisplays = {
    invitedRooms: 0,
    chatRooms: 1,
  };

  const [roomsDisplay, setRoomsDisplay] = useState(roomsDisplays.chatRooms);

  return roomsDisplay === roomsDisplays.invitedRooms ? (
    <InvitedRooms
      setRoomsDisplay={setRoomsDisplay}
      roomsDisplays={roomsDisplays}
      invitedRooms={invitedRooms}
      user={user}
      setUser={setUser}
      socket={socket}
    />
  ) : (
    <ChatRooms
      setDisplay={setDisplay}
      displays={displays}
      setRoomsDisplay={setRoomsDisplay}
      roomsDisplays={roomsDisplays}
      rooms={rooms}
      setCurrentRoom={setCurrentRoom}
      setRoomInvite={setRoomInvite}
      user={user}
      setUser={setUser}
      socket={socket}
    />
  );
};

export default Rooms;
