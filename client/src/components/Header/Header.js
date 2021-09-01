import { Link } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button';

const Header = ({ user, setUser }) => {
  return (
    <Navbar bg="dark" variant="dark">
      <Container>
        <Link to="/">
          <Navbar.Brand>Chat</Navbar.Brand>
        </Link>
        <Nav className="mr-auto">
          <Link className="nav-link" to="/chat">
            Messages
          </Link>
        </Nav>
        {user ? (
          <Link to="/">
            <Button onClick={() => setUser(null)}>sign out</Button>
          </Link>
        ) : (
          <Link to="/signin">
            <Button variant="light">
              sign in
            </Button>
          </Link>
        )}
      </Container>
    </Navbar>
  );
};

export default Header;
