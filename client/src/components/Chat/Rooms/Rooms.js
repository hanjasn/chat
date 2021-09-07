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
  setRoomInviteID,
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
    />
  ) : (
    <ChatRooms
      setDisplay={setDisplay}
      displays={displays}
      setRoomsDisplay={setRoomsDisplay}
      roomsDisplays={roomsDisplays}
      rooms={rooms}
      setCurrentRoom={setCurrentRoom}
      setRoomInviteID={setRoomInviteID}
    />
  );
};

export default Rooms;