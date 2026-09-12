import { useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import User from "../components/User.jsx";

const Landing = ({ fetchUsers, users, currentUser }) => {
  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="text-center mt-4">
      <h1 className="display-4 mb-4">Welcome to ConnectBook</h1>

      <Row>
        {users.map((user) => (
          <Col key={user._id} xl={3} lg={4} md={6} className="mt-4">
            <User user={user} fetchUsers={fetchUsers} currentUser = {currentUser} />
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default Landing;
