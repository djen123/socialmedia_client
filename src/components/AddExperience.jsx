import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { CiEdit } from "react-icons/ci";
import { IoMdAdd } from "react-icons/io";
import { useSelector } from 'react-redux';
import axios from '../api/axios.js';

function AddExperience({ user, fetchUserProfile }) {
  const [show, setShow] = useState(false);
  const [experience, setExperience] = useState({
    title: '',
    company: '',
    startDate: '',
    endDate: null,
    user: user._id
  })
  const [companies, setCompanies] = useState([]);

  const fetchCompanies = async () => {
    try {
      const res = await axios.get('/companies')
      setCompanies(res.data.companies)
    } catch (error) {
      console.error('Error fetching companies:', error)
    }
  }

  useEffect(() => {
    fetchCompanies()
  }, [])

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleExperience = async () => {
    try {
      const res = await axios.post(`/users/${user._id}/experience`, experience)
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
        <IoMdAdd />{' '}
        Add experience
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Experience</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Title</Form.Label>
              <Form.Control 
                type="text" 
                placeholder="Enter title" 
                value={experience.title}
                onInput={(e) => setExperience({ ...experience, title: e.target.value })}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Company</Form.Label>
              <Form.Select
                value={experience.company}
                onChange={(e) => setExperience({ ...experience, company: e.target.value })}
              >
                <option value="">Select company</option>
                {companies.map((company) => (
                  <option 
                    key={company._id} 
                    value={company._id}
                  >
                    {company.name}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Start date</Form.Label>
              <Form.Control 
                type="date" 
                placeholder="Enter URL" 
                value={experience.avatar}
                onInput={(e) => setExperience({ ...experience, startDate: e.target.value })}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>End date</Form.Label>
              <Form.Control 
                type="date" 
                placeholder="Location" 
                value={experience.location}
                onInput={(e) => setExperience({ ...experience, endDate: e.target.value })}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleExperience}>
            Add
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default AddExperience;