import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { CiEdit } from "react-icons/ci";
import { useSelector } from 'react-redux';
import axios from '../api/axios.js';

function EditProfile({ user, fetchUserProfile }) {
  const [show, setShow] = useState(false);
  const [editUser, setEditUser] = useState({
    name: user.name || '',
    bio: user.bio,
    about: user.about,
    avatar: user.avatar || '',
    coverImage: user.coverImage,
    location: user.location,
    skills: user.skills ? user.skills.join(', ') : ''
  })

  useEffect(() => {
    setEditUser({
      name: user.name || '',
      bio: user.bio,
      about: user.about,
      avatar: user.avatar || '',
      coverImage: user.coverImage,
      location: user.location,
      skills: user.skills ? user.skills.join(', ') : ''
    })
  }, [user])

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleEditProfile = async () => {
    try {
      const res = await axios.patch(`/users/${user._id}`, editUser)
      alert(res.data.message)
      fetchUserProfile()
    } catch (error) {
      if(error.response && (error.response.status === 401 || error.response.status === 403)) {
        alert(error.response.data.message)
        return
      }
      console.error('Error updating user profile:', error)
    }
    handleClose()
  }

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        <CiEdit />{' '}
        Edit Profile
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Profile</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control 
                type="text" 
                placeholder="Enter name" 
                value={editUser.name}
                onInput={(e) => setEditUser({ ...editUser, name: e.target.value })}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Headline</Form.Label>
              <Form.Control 
                type="text" 
                placeholder="Headline" 
                value={editUser.bio}
                onInput={(e) => setEditUser({ ...editUser, bio: e.target.value })}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>About</Form.Label>
              <Form.Control 
                type="text" 
                as="textarea" 
                rows={3} 
                placeholder="About" 
                value={editUser.about}
                onInput={(e) => setEditUser({ ...editUser, about: e.target.value })}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Profile picture</Form.Label>
              <Form.Control 
                type="text" 
                placeholder="Enter URL" 
                value={editUser.avatar}
                onInput={(e) => setEditUser({ ...editUser, avatar: e.target.value })}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Cover image</Form.Label>
              <Form.Control 
                type="text" 
                placeholder="Enter URL" 
                value={editUser.coverImage}
                onInput={(e) => setEditUser({ ...editUser, coverImage: e.target.value })}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Location</Form.Label>
              <Form.Control 
                type="text" 
                placeholder="Location" 
                value={editUser.location}
                onInput={(e) => setEditUser({ ...editUser, location: e.target.value })}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Skills</Form.Label>
              <Form.Control 
                type="text" 
                placeholder="Skills (comma separated)" 
                value={editUser.skills}
                onInput={(e) => setEditUser({ ...editUser, skills: e.target.value })}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleEditProfile}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default EditProfile;