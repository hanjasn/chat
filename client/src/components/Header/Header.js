import { Link } from 'react-router-dom';
import './Header.css';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

const Header = ({ user, setUser }) => (
  <Navbar className="navbar" bg='dark' variant="dark">
    <Container fluid>
      <Col>
        <Link className='links' to="/">
          <Navbar.Brand>Chat</Navbar.Brand>
        </Link>
        <Link className="navbar-link links" to="/chat">
          Messages
        </Link>
      </Col>
      <Col className='d-flex justify-content-end'>
        {user ? (
          <Link onClick={() => setUser(null)} to="/">
            {/* null because JSON cannot parse undefined */}
            <Button variant="dark">sign out</Button>
          </Link>
        ) : (
          <Link to="/signin">
            <Button variant="primary">sign in</Button>
          </Link>
        )}
      </Col>
    </Container>
  </Navbar>
);

export default Header;
