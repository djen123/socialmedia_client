import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { CiEdit } from "react-icons/ci";
import { IoMdAdd } from "react-icons/io";
import { useSelector } from 'react-redux';
import axios from '../api/axios.js';

function AddEducation({ user, fetchUserProfile }) {
  const [show, setShow] = useState(false);
  const [education, setEducation] = useState({
    degree: '',
    university: '',
    startDate: '',
    endDate: null,
    user: user._id
  })
  const [universities, setUniversities] = useState([]);

  const fetchCompanies = async () => {
    try {
      const res = await axios.get('/universities')
      setUniversities(res.data.universities)
    } catch (error) {
      console.error('Error fetching universities:', error)
    }
  }

  useEffect(() => {
    fetchCompanies()
  }, [])

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleEducation = async () => {
    try {
      const res = await axios.post(`/users/${user._id}/education`, education)
      alert(res.data.message)
      fetchUserProfile()//fetches updated users details
    } catch (error) {
      if(error.response && (error.response.status === 401 || error.response.status === 403)) {
        alert(error.response.data.message)
        return
      }
      console.error('Error updating user profile:', error)
    }
    handleClose() // once done close the modal
  }

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        <IoMdAdd />{' '}
        Add education
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Education</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Degree</Form.Label>
              <Form.Control 
                type="text" 
                placeholder="Enter title" 
                value={education.title}
                onInput={(e) => setEducation({ ...education, degree: e.target.value })}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>University</Form.Label>
              <Form.Select
                value={education.university}
                onChange={(e) => setEducation({ ...education, university: e.target.value })}
              >
                <option value="">Select university</option>
                {universities.map((university) => (
                  <option 
                    key={university._id} 
                    value={university._id}
                  >
                    {university.name}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Start date</Form.Label>
              <Form.Control 
                type="date" 
                placeholder="Enter date" 
                value={education.avatar}
                onInput={(e) => setEducation({ ...education, startDate: e.target.value })}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>End date</Form.Label>
              <Form.Control 
                type="date" 
                placeholder="Location" 
                value={education.location}
                onInput={(e) => setEducation({ ...education, endDate: e.target.value })}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleEducation}>
            Add
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default AddEducation;