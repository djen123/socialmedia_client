import { Row, Col, Button } from 'react-bootstrap';
import jobInterviewImg from '../assets/landing-page/job-interview.svg';
import { Link, useNavigate } from 'react-router';

function Landing(props) {
  let navigate = useNavigate();

  return (
    <div>
      <Row className='align-items-center'>
        <Col md={6}>
          <h1 className='display-5 mb-4'>
            Build your professional brand & network to get ahead in your career
          </h1>
          <Button 
            variant="primary"
            className='w-100 mb-4'
            onClick={() => navigate('/login')}
          >Sign in with email</Button>
          <p className='small mb-4'>
            By clicking Continue to join or sign in, you agree to LinkedIn’s <a className='app-link' href='#'>User Agreement</a>, <a className='app-link' href='#'>Privacy Policy</a>, and <a className='app-link' href='#'>Cookie Policy</a>.
          </p>
          <p>
            New to LinkedIn?{' '}
            <Link to='/signup' className='app-link'>Join now</Link>
          </p>
        </Col>
        <Col md={6}>
          <img 
            src={jobInterviewImg} 
            alt='Job Interview' 
            className='img-fluid'
          />
        </Col>
      </Row>
    </div>
  );
}

export default Landing;