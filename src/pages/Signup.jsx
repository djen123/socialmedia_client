import { useState } from "react";
import { Form, Button } from "react-bootstrap";
import axios from "../api/axios";
import { useNavigate } from "react-router-dom";

const Signup = ({ fetchUsers,fetchCurrentUser }) => {
  const [newUser, setNewUser] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
    avatar: ""
  });

  const navigate = useNavigate();

  const handleSignUp = async () => {
    try {
      const res = await axios.post("/users/signup", newUser);

      alert(res.data.message);
      fetchCurrentUser()
      navigate("/");

      fetchUsers();

      // Reset form
      setNewUser({
        name: "",
        username: "",
        email: "",
        password: "",
        avatar: ""
      });

    } catch (error) {
      if (error.response) {
        alert(error.response.data.message);
      }
      console.error("Signup error:", error);
    }
  };

  return (
    <div className="container mt-4" style={{maxWidth:"400px",margin:"0 auto",padding:"20px",boxShadow:"rgba(0,0,0,0.16)0px 1px 4px"}}>
      <h1 className="display-5 mb-4">Signup</h1>

      <Form>
        <Form.Group className="mb-3">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter name"
            value={newUser.name}
            onChange={(e) =>
              setNewUser({ ...newUser, name: e.target.value })
            }
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter username"
            value={newUser.username}
            onChange={(e) =>
              setNewUser({ ...newUser, username: e.target.value })
            }
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={newUser.email}
            onChange={(e) =>
              setNewUser({ ...newUser, email: e.target.value })
            }
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter password"
            value={newUser.password}
            onChange={(e) =>
              setNewUser({ ...newUser, password: e.target.value })
            }
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Avatar</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter avatar URL"
            value={newUser.avatar}
            onChange={(e) =>
              setNewUser({ ...newUser, avatar: e.target.value })
            }
          />
        </Form.Group>

        <div className="d-flex justify-content-end">
          <Button variant="primary" type="button" onClick={handleSignUp}>
            Sign up
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default Signup;
