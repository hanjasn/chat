import { Link } from 'react-router-dom';
import './Header.css';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button';

const Header = ({ user, setUser }) => (
  <Navbar className="navbar border border-dark" variant="dark">
    <Container>
      <Link to="/">
        <Navbar.Brand>Chat</Navbar.Brand>
      </Link>
      <Nav className="mr-auto">
        <Link className="navbar-link" to="/chat">
          Messages
        </Link>
      </Nav>
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
    </Container>
  </Navbar>
);

export default Header;
