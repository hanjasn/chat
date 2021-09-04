import React from 'react';
import './Rooms.css';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';

const Rooms = ({ displays, setDisplay, rooms, setCurrentRoom }) => {
  return (
    /* column displaying all rooms */
    <Col className="border border-dark" md="3">
      {/* top bar for creating a new room */}
      <Row className="border border-dark rooms-header">
        <Col className="rooms-title">Chat Rooms</Col>
        <Col className="d-flex justify-content-end col-md-3">
          <Button
            className="add-room-button"
            variant="light"
            onClick={() => setDisplay(displays.addRoom)}
          >
            +
          </Button>
        </Col>
      </Row>
      {/* all rooms user is currently in mapped out to multiple rows*/}
      {rooms.map((room, i) => (
        <Row
          className="list-room border border-dark"
          key={i}
          onClick={() => {
            setCurrentRoom(room);
            setDisplay(displays.messages);
          }}
        >
          {room.name}
        </Row>
      ))}
    </Col>
  );
};

export default Rooms;
