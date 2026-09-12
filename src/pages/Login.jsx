import { useState } from "react";
import { Form, Button } from "react-bootstrap";
import axios from "../api/axios.js";
import { useNavigate } from "react-router-dom";

const Login = ({fetchCurrentUser}) => {
  const [user, setUser] = useState({
    email: "",
    password: ""
  });

  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await axios.post("/users/login", user);

      alert(res.data.message);
      fetchCurrentUser()
      navigate("/");

    } catch (error) {
      if (error.response) {
        alert(error.response.data.message);
      }
      console.error("Login error:", error);
    }
  };

  return (
    <div style={{maxWidth:"400px",margin:"0 auto",padding:"20px",boxShadow:"rgba(0,0,0,0.16)0px 1px 4px"}}>
      <h1 className="display-5 mb-4">Login</h1>

      <Form>
        <Form.Group className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={user.email}
            onChange={(e) =>
              setUser({ ...user, email: e.target.value })
            }
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter password"
            value={user.password}
            onChange={(e) =>
              setUser({ ...user, password: e.target.value })
            }
          />
        </Form.Group>

        <div className="d-flex justify-content-end">
          <Button variant="primary" type="button" onClick={handleLogin}>
            Login
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default Login;
