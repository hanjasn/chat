import React from 'react';
import { Scrollbar } from 'react-scrollbars-custom';
import './ChatRooms.css';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import Dropdown from 'react-bootstrap/Dropdown';

const ChatRooms = ({
  setDisplay,
  displays,
  setRoomsDisplay,
  roomsDisplays,
  rooms,
  setCurrentRoom,
  setRoomInvite,
}) => {
  return (
    /* column displaying all rooms */
    <Col className="border border-dark" md="3">
      {/* top bar for creating a new room */}
      <Row className="rooms-header">
        <Col className="rooms-title">Chat Rooms</Col>
        <Col className="d-flex justify-content-end" md="4">
          <div>
            <Dropdown>
              <Dropdown.Toggle variant='dark' />
              <Dropdown.Menu>
                <Dropdown.Item
                  onClick={() => {
                    setRoomsDisplay(roomsDisplays.invitedRooms);
                  }}
                >
                  Invited Rooms
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
          <div className="add-room-button">
            <Button variant="light" onClick={() => setDisplay(displays.createRoom)}>
              +
            </Button>
          </div>
        </Col>
      </Row>
      {/* all rooms user is currently in mapped out to multiple rows*/}
      <Row className="rooms-list-row">
        <Scrollbar>
          <Col className="rooms-list-col">
            {rooms.map((room, i) => (
              <Row className="list-room border-bottom border-dark" key={i}>
                <Col
                  className="list-room-name"
                  onClick={() => {
                    setCurrentRoom(room);
                    setDisplay(displays.messages);
                  }}
                >
                  {room.name}
                </Col>
                <Col md="2">
                  <Dropdown className="list-room-options">
                    <Dropdown.Toggle variant="dark" />
                    <Dropdown.Menu>
                      <Dropdown.Item onClick={() => {
                        setDisplay(displays.inviteUser);
                        setRoomInvite(room);
                      }}>
                        Invite user
                      </Dropdown.Item>
                      {/* TODO */}
                      <Dropdown.Item onClick={null}>Show users</Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </Col>
              </Row>
            ))}
          </Col>
        </Scrollbar>
      </Row>
    </Col>
  );
};

export default ChatRooms;
