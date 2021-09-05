import React from 'react';
import { Scrollbar } from 'react-scrollbars-custom';
import './Rooms.css';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import Dropdown from 'react-bootstrap/Dropdown';

const Rooms = ({ displays, setDisplay, rooms, setCurrentRoom }) => {
  return (
    /* column displaying all rooms */
    <Col className="border border-dark" md="3">
      {/* top bar for creating a new room */}
      <Row className="rooms-header">
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
      <Row className='rooms-list'>
        <Scrollbar>
          {rooms.map((room, i) => (
            <div
              className="list-room d-flex"
              key={i}
              onClick={() => {
                setCurrentRoom(room);
                setDisplay(displays.messages);
              }}
            >
              <div>{room.name}</div>
              <Dropdown className='list-room-options'>
                <Dropdown.Toggle variant='dark' />
                <Dropdown.Menu>
                <Dropdown.Item onClick={null}> {/* TODO */}
                    Invite user
                  </Dropdown.Item>
                  <Dropdown.Item>
                    Show users
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </div>
          ))}
        </Scrollbar>
      </Row>
    </Col>
  );
};

export default Rooms;
