import { useState } from 'react'
import { Form, Button } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router';
import { loginUser } from '../store/actions/auth.js'
import { useDispatch } from 'react-redux'

const wrapperStyle = {
  maxWidth: '400px',
  margin: '0 auto',
  padding: '20px',
  boxShadow: 'rgba(0, 0, 0, 0.16) 0px 1px 4px',
  backgroundColor: 'white',
  borderRadius: '6px'
}

function Login() {
  const [user, setUser] = useState({
    email: '',
    password: ''
  })
  let navigate = useNavigate();
  const dispatch = useDispatch()

  async function handleLogin() {
    const result = await dispatch(loginUser(user))
    if(result.ok) navigate('/feed')
  }

  return (
    <div style={wrapperStyle}>
      <h1 className='display-6 mb-2'>Sign in</h1>
      <p>
        New to LinkedIn?{' '}
        <Link to='/signup' className='app-link'>Join now</Link>
      </p>
      <Form>
        <Form.Group className="mb-3">
          <Form.Label>Email address</Form.Label>
          <Form.Control 
            type="email" 
            placeholder="Enter email" 
            value={user.email}
            onInput={(e) => setUser({ ...user, email: e.target.value })}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control 
            type="email" 
            placeholder="Enter password" 
            value={user.password}
            onInput={(e) => setUser({ ...user, password: e.target.value })}
          />
        </Form.Group>

        <p className='small mb-4'>
          By clicking Continue to join or sign in, you agree to LinkedIn’s <a className='app-link' href='#'>User Agreement</a>, <a className='app-link' href='#'>Privacy Policy</a>, and <a className='app-link' href='#'>Cookie Policy</a>.
        </p>

        <Button 
          variant="primary" 
          type="button"
          className='w-100 mb-2'
          onClick={handleLogin}
        >
          Sign in
        </Button>
      </Form>
    </div>
  );
}

export default Login;