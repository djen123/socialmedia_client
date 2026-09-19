import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { NavLink } from 'react-router';
import logo from '../assets/logo/LI-Logo.png';
import { useNavigate } from "react-router";
import { AiFillHome } from "react-icons/ai";
import { FaUserFriends } from "react-icons/fa";
import { TbBriefcase2Filled } from "react-icons/tb";
import { IoIosLogOut } from "react-icons/io";
import { useDispatch, useSelector } from 'react-redux'
import { logoutUser } from '../store/actions/auth.js'

const navLinkWrapperStyle = {
  position: 'sticky',
  top: 0,
  zIndex: 1000,
  padding: 0
}

function AppNavbar() {
  let navigate = useNavigate()
  const dispatch = useDispatch()
  const currentUser = useSelector((store) => store.auth.currentUser)

  async function handleLogout() {
    await dispatch(logoutUser())
    navigate('/')
  }

  return (
    <Navbar collapseOnSelect expand="lg" 
      className="bg-white" 
      style={navLinkWrapperStyle}>
      <Container>
        <Navbar.Brand
          as={NavLink}
          to="/"
        >
          <img
            alt=""
            src={logo}
            height="30"
            className="d-inline-block align-top"
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Form.Control
            type="search"
            placeholder="I'm looking for ..."
            className="me-2"
            aria-label="Search"
            style={{ maxWidth: '300px' }}
          />
          <Nav className="me-auto">
            <Nav.Link
              as={NavLink}
              to="/feed"
            >
              <span className="d-flex flex-column align-items-center">
                <AiFillHome className='fs-4' />
                <span style={{ fontSize: '10px' }}>Home</span>
              </span>
            </Nav.Link>
            <Nav.Link
              as={NavLink}
              to="/network"
            >
              <span className="d-flex flex-column align-items-center">
                <FaUserFriends className='fs-4' />
                <span style={{ fontSize: '10px' }}>My Network</span>
              </span>
            </Nav.Link>
            <Nav.Link
              as={NavLink}
              to="/jobs"
            >
              <span className="d-flex flex-column align-items-center">
                <TbBriefcase2Filled className='fs-4' />
                <span style={{ fontSize: '10px' }}>Jobs</span>
              </span>
            </Nav.Link>
          </Nav>
          <Nav>
            {currentUser ? (
              <>
                <Nav.Link
                  as={NavLink}
                  to={`/in/${currentUser.username}`}
                >
                  <span className="d-flex flex-column align-items-center">
                    <img
                      alt=""
                      src={currentUser.avatar}
                      width="24"
                      height="24"
                      className="d-inline-block align-top rounded-circle"
                    />
                    <span style={{ fontSize: '10px' }}>Me</span>
                  </span>
                </Nav.Link>
                <Nav.Link
                  onClick={handleLogout}
                  variant="outline-dark"
                >
                  <span className="d-flex flex-column align-items-center">
                    <IoIosLogOut className='fs-4' />
                    <span style={{ fontSize: '10px' }}>Logout</span>
                  </span>
                </Nav.Link>
              </>
            ) : (
              <>
                <Nav.Link
                  as={NavLink}
                  to="/login"
                >
                  Sign in
                </Nav.Link>
                <Button
                  variant="primary"
                  onClick={() => navigate('/signup')}
                >
                  Join now
                </Button>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default AppNavbar;