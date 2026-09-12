import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import { NavLink, useNavigate } from 'react-router-dom';
import logo from '../assets/logo.png';
import axios from '../api/axios.js';

function AppNavBar({ currentUser,logoutFrontEnd }) {
  const navigate = useNavigate();

  async function handleLogout() {
    try {
      const res = await axios.post("/users/logout");
      alert(res.data.message);
      logoutFrontEnd() // clears react state
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Navbar expand="lg" bg="dark" variant="dark" className="shadow-sm py-2">
      <Container>

        {/* Brand */}
        <Navbar.Brand as={NavLink} to="/" className="fw-bold d-flex align-items-center gap-2">
          <img
            src={logo}
            width="35"
            height="35"
            alt="logo"
            style={{ borderRadius: "5px" }}
          />
          Connect
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="main-navbar" />
        <Navbar.Collapse id="main-navbar">

          {/* Left Links */}
          <Nav className="me-auto">
             <Nav.Link as={NavLink} to="/posts">Posts</Nav.Link>
            <Nav.Link as={NavLink} to="/followers">Followers</Nav.Link>
            <Nav.Link as={NavLink} to="/following">Following</Nav.Link>
          </Nav>

          {/* Right Section */}
          <Nav className="align-items-center gap-3">

            {currentUser ? (
              <>
                {/* User avatar + name */}
                <div className="d-flex align-items-center gap-2 text-light">
                  <img
                    src={currentUser.avatar}
                    width="35"
                    height="35"
                    alt="avatar"
                    style={{ borderRadius: "50%" }}
                  />
                  Hi, @{currentUser.name}
                </div>

                {/* Logout */}
                <Button variant="outline-light" size="sm" onClick={handleLogout}>
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Nav.Link as={NavLink} to="/signup">Signup</Nav.Link>
                <Nav.Link as={NavLink} to="/login">Login</Nav.Link>
              </>
            )}

          </Nav>

        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default AppNavBar;
