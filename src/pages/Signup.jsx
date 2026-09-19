import { useState } from 'react'
import { Form, Button } from 'react-bootstrap'
import { useNavigate } from "react-router";
import { signupUser } from '../store/actions/auth.js'
import { useDispatch } from 'react-redux'

const wrapperStyle = {
  maxWidth: '400px',
  margin: '0 auto',
  padding: '20px',
  boxShadow: 'rgba(0, 0, 0, 0.16) 0px 1px 4px',
  backgroundColor: 'white',
  borderRadius: '6px'
}

function Signup() {
  const [newUser, setNewUser] = useState({
    name: '',
    username: '',
    email: '',
    password: '',
    avatar: ''
  })
  let navigate = useNavigate();
  const dispatch = useDispatch()

  async function handleSignup() {
    const result = await dispatch(signupUser(newUser))
    if(result.ok) navigate('/feed')
  }

  return (
    <div style={wrapperStyle}>
      <h1 className='display-6 mb-4'>Join LinkedIn now</h1>
      <Form>
        <Form.Group className="mb-3">
          <Form.Label>Name</Form.Label>
          <Form.Control 
            type="text" 
            placeholder="Enter name" 
            value={newUser.name}
            onInput={(e) => setNewUser({ ...newUser, name: e.target.value })}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Username</Form.Label>
          <Form.Control 
            type="text" 
            placeholder="Enter username" 
            value={newUser.username}
            onInput={(e) => setNewUser({ ...newUser, username: e.target.value })}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Email address</Form.Label>
          <Form.Control 
            type="email" 
            placeholder="Enter email" 
            value={newUser.email}
            onInput={(e) => setNewUser({ ...newUser, email: e.target.value })}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control 
            type="email" 
            placeholder="Enter password" 
            value={newUser.password}
            onInput={(e) => setNewUser({ ...newUser, password: e.target.value })}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Profile picture</Form.Label>
          <Form.Control 
            type="text" 
            placeholder="Enter URL" 
            value={newUser.avatar}
            onInput={(e) => setNewUser({ ...newUser, avatar: e.target.value })}
          />
        </Form.Group>

        <p className='small mb-4'>
          By clicking Continue to join or sign in, you agree to LinkedIn’s <a className='app-link' href='#'>User Agreement</a>, <a className='app-link' href='#'>Privacy Policy</a>, and <a className='app-link' href='#'>Cookie Policy</a>.
        </p>

        <Button 
          variant="primary" 
          type="button"
          className='w-100 mb-2'
          onClick={handleSignup}
        >
          Signup
        </Button>
      </Form>
    </div>
  );
}

export default Signup;