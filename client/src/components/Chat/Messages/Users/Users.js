import React from 'react';
import './Users.css';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Scrollbar } from 'react-scrollbars-custom';
import CloseButton from 'react-bootstrap/CloseButton';

// users is an array of usernames
const Users = ({ users, setShowUsers }) => {
  // TODO: check if width of <Messages /> is okay
  return (
    <Col md="3">
      <Row className="users-header">
        <Col className="users-title">Users</Col>
        <Col md="2">
          <CloseButton
            className="users-close-button"
            variant="white"
            onClick={() => setShowUsers(false)}
          />
        </Col>
      </Row>
      <Row className="users-list-row">
        <Scrollbar>
          <Col className="users-list-col">
            {users.map((user, i) => (
              <Row className="list-user border-bottom border-dark" key={i}>
                <Col className="list-user-name">{user.username}</Col>
              </Row>
            ))}
          </Col>
        </Scrollbar>
      </Row>
    </Col>
  );
};

export default Users;
