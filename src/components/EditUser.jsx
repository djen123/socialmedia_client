import { useEffect, useState } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import axios from "../api/axios";

function EditUser({ fetchUsers, user, editUserId, setEditUserId }) {
  const [show, setShow] = useState(false);

  const [editUser, setEditUser] = useState({
    name: user.name,
    username: user.username,
    email: user.email,
    avatar: user.avatar
  });

  useEffect(() => {
    if (editUserId) {
      setShow(true);
    }
  }, [editUserId]);

  const handleClose = () => {
    setShow(false);
    setEditUserId(null);
  };

  const handleEditUser = async () => {
    try {
      const response = await axios.patch(`/users/${user._id}`, {
        name: editUser.name,
        avatar: editUser.avatar
      });

      alert(response.data.message);
      fetchUsers();

    } catch (error) {
      if (error.response) {
        alert(error.response.data.message);
      }
      console.error("Update error:", error);
    }

    setEditUserId(null);
    setShow(false);
  };

  return (
    <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}>
      <Modal.Header closeButton>
        <Modal.Title>Edit User</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form>

          <Form.Group className="mb-3">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              value={editUser.name}
              onChange={(e) =>
                setEditUser({ ...editUser, name: e.target.value })
              }
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Username</Form.Label>
            <Form.Control type="text" value={editUser.username} disabled />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control type="email" value={editUser.email} disabled />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Avatar</Form.Label>
            <Form.Control
              type="text"
              value={editUser.avatar}
              onChange={(e) =>
                setEditUser({ ...editUser, avatar: e.target.value })
              }
            />
          </Form.Group>

        </Form>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>

        <Button variant="primary" onClick={handleEditUser}>
          Update
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default EditUser;
