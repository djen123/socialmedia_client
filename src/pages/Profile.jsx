import { useState, useEffect } from 'react';
import { Row, Col, Button, ListGroup, Badge } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router';
import { FaUserFriends } from "react-icons/fa";
import { useSelector } from 'react-redux'
import { useParams } from 'react-router';
import { HiUserAdd } from "react-icons/hi";
import axios from '../api/axios.js';
import EditProfile from '../components/EditProfile';
import AddExperience from '../components/AddExperience';
import AddEducation from '../components/AddEducation';
import { format, formatDistance } from 'date-fns'

const wrapperStyle = {
  margin: '10px auto',
  padding: '20px',
  boxShadow: 'rgba(0, 0, 0, 0.16) 0px 1px 4px',
  backgroundColor: 'white',
  borderRadius: '6px'
}

function Profile() {
  const { username } = useParams()
  const [user, setUser] = useState({})
  const currentUser = useSelector((store) => store.auth.currentUser)
  
  const fetchUserProfile = async () => {
    try {
      const res = await axios.get(`/users/username/${username}`)
      setUser(res.data.user)
    } catch (error) {
      console.error('Error fetching user profile:', error)
    }
  }

  useEffect(() => {
    fetchUserProfile()
  }, [username])

  function formatRange(startDate, endDate) {
    if(!startDate) return ''
    const start = format(new Date(startDate), 'MMM yyyy')
    const end = endDate ? format(new Date(endDate), 'MMM yyyy') : 'Present'
    const distance = formatDistance(startDate, endDate ? endDate : new Date())
    return `${start} - ${end} · ${distance}`
  }

  return (
    <div>
      <div style={wrapperStyle}>
        <img 
          src={user.coverImage||"https://images.unsplash.com/photo-1751225750479-43ad27b94fa0?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"} 
          alt='profile-banner' 
          style={{ width: '100%', height: '200px',objectFit:"cover" }}
        />
        <img 
          src={user.avatar}
          alt='profile-picture'
          className='rounded-circle'
          style={{ 
            width: '160px', 
            height: '160px',
            position: 'relative',
            top: '-75px',
            left: '20px',
            border: '5px solid white'
          }}
        />
        <Row 
          style={{ 
            position: 'relative',
            top: '-50px',
          }}
        >
          <Col md={9}>
            <p className='fs-2 fw-medium'>{user.name}</p>
            <p className='lead'>
              {user.bio}
            </p>
            <p className='small text-muted'>
              {user.location}
            </p>

            <div>
              {currentUser?.username === username ? (
                <EditProfile 
                  user={user}
                  fetchUserProfile={fetchUserProfile}
                />
              ) : (
              <Button variant='primary'>
                <HiUserAdd />{' '}
                Connect
              </Button>
              )}
            </div>
          </Col>
          
            <Col md={3} className='mt-2'>
              {user.experiences?.[0] && (
                <div className='mb-3'>
                  <img
                    alt=""
                    src={user.experiences[0].company?.logo}
                    height="30"
                    className="d-inline-block align-top"
                  />{' '}{user.experiences[0].company?.name}
                </div>
              )}
              {user.education?.[0] && (
                <div>
                  <img
                    alt=""
                    src={user.education[0].university?.logo}
                    height="30"
                    className="d-inline-block align-top"
                  />{' '}{user.education[0].university?.name}
                </div>
              )}
            </Col>
        </Row>
      </div>

      
      <div style={wrapperStyle}>
        <p className='fs-4'>About</p>
        <p>{user.about}</p>
      </div>
      <div style={wrapperStyle}>
        <div className='d-flex justify-content-between align-items-start'>
          <p className='fs-4'>Experience</p>
          {currentUser?.username === username && 
            <AddExperience
              user={user}
              fetchUserProfile={fetchUserProfile}
            />
          }
        </div>
        
        {user.experiences?.map((experience) => (
          <div key={experience._id} className='d-flex gap-2 pb-3 mb-3 border-bottom'>
            <img
              alt="company-logo"
              src={experience.company?.logo}
              height="50"
              className="d-inline-block align-top"
            />
            <div>
              <div className='fs-5 fw-medium'>{experience.title}</div>
              <div className='small text-muted'>{experience.company?.name} · Full time</div>
              <div className='small text-muted'>{formatRange(experience.startDate, experience.endDate)}</div>
            </div>
          </div>
        ))}
      </div>
      <div style={wrapperStyle}>
        <div className='d-flex justify-content-between align-items-start'>
          <p className='fs-4'>Education</p>
          {currentUser?.username === username && 
            <AddEducation
              user={user}
              fetchUserProfile={fetchUserProfile}
            />
          }
        </div>
        
        {user.education?.map((education) => (
          <div key={education._id} className='d-flex gap-2 pb-3 mb-3 border-bottom'>
            <img
              alt=""
              src={education.university?.logo}
              height="50"
              className="d-inline-block align-top"
            />
            <div>
              <div className='fs-5 fw-medium'>{education.degree}</div>
              <div className='small text-muted'>{education.university?.name}</div>
              <div className='small text-muted'>{formatRange(education.startDate, education.endDate)}</div>
            </div>
          </div>
        ))}
      </div>
      <div style={wrapperStyle}>
        <p className='fs-4'>Skills ({ user.skills?.length || 0 })</p>
        <ListGroup>
          {user.skills?.map((skill, index) => (
            <ListGroup.Item
              as="li"
              className="d-flex justify-content-between align-items-start border-0 border-bottom"
              key={index}
            >
              <div className="ms-2 me-auto">
                <div className="fw-bold">{skill}</div>
              </div>
            </ListGroup.Item>
          ))}
        </ListGroup>
      </div>
    </div>
  );
}

export default Profile;