import React from 'react';
import { Scrollbar } from 'react-scrollbars-custom';
import './InvitedRooms.css';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import CloseButton from 'react-bootstrap/CloseButton';
import Button from 'react-bootstrap/Button';
import axios from 'axios';

/**
 * Ignore 'findDOMNode is deprecated in StrictMode' warning in console
 *
 * Only change rooms display and not main display
 * Add accept and decline buttons directly on room listing
 *
 * Procedure:
 *   If accepted:
 *     Make a post request passing in { username, roomID: invitedRoom.id }
 *     In database:
 *       Remove room id from user's invitedRooms list
 *       Add room id to user's rooms list
 *       Add username to room's users list
 *     Get user from server
 *     rooms and invitedRooms will automatically update in useEffect after user changes
 *   If declined:
 *     Make a post request passing in { username, roomID: invitedRoom.id }
 *     In database:
 *       Remove room id from user's invitedRooms list
 *     Get user from server
 *     invitedRooms will automatically update in useEffect after user changes
 *   Do not change roomsDisplay
 */
const InvitedRooms = ({
  setRoomsDisplay,
  roomsDisplays,
  invitedRooms,
  user,
  setUser,
  socket
}) => {
  const acceptInvitation = async (invitedRoomID) => {
    socket.emit('sendMessage', {
      messageRoomID: invitedRoomID,
      username: 'admin',
      text: `${user.username} has joined the room`,
    });

    await axios.post('/invitation/accept', {
      username: user.username,
      roomID: invitedRoomID,
    });
    const res = await axios.get(`/user/${user.username}`);
    setUser(res.data.user);
  };

  const declineInvitation = async (invitedRoomID) => {
    await axios.post('/invitation/decline', {
      username: user.username,
      roomID: invitedRoomID,
    });
    const res = await axios.get(`/user/${user.username}`);
    setUser(res.data.user);
  };

  return (
    /* column displaying all rooms */
    <Col className="border border-dark" md="3">
      {/* top bar showing all rooms user is invited to */}
      <Row className="rooms-header">
        <Col className="rooms-title">Invited Rooms</Col>
        <Col className="d-flex justify-content-end" md="2">
          <div className="close-button">
            <CloseButton
              variant="white"
              onClick={() => setRoomsDisplay(roomsDisplays.chatRooms)}
            />
          </div>
        </Col>
      </Row>
      {/* all rooms user is invited to mapped out to multiple rows */}
      <Row className="rooms-list-row">
        <Scrollbar>
          <Col className="rooms-list-col">
            {invitedRooms.map((invitedRoom, i) => (
              <Row className="list-room border-bottom border-dark" key={i}>
                <Col
                  className="list-room-name"
                  onClick={() => {
                    return null;
                  }}
                >
                  {invitedRoom.name}
                </Col>
                <Col md="6">
                  <Button
                    className="accept-invite-button"
                    variant="success"
                    size="sm"
                    onClick={() => acceptInvitation(invitedRoom.id)}
                  >
                    Accept
                  </Button>
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => declineInvitation(invitedRoom.id)}
                  >
                    Decline
                  </Button>
                </Col>
              </Row>
            ))}
          </Col>
        </Scrollbar>
      </Row>
    </Col>
  );
};

export default InvitedRooms;
