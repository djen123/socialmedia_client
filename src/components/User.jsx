import { useState } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { FaUserEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import axios from "../api/axios";
import EditUser from "./EditUser";

function User({ user, fetchUsers,currentUser}) {
  const [editUserId, setEditUserId] = useState(null);

  const deleteUser = async () => {
    try {
      const response = await axios.delete(`/users/${user._id}`);
      alert(response.data.message);
      fetchUsers();
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  return (
    <>
      <EditUser
        user={user}
        fetchUsers={fetchUsers}
        editUserId={editUserId}
        setEditUserId={setEditUserId}
      />

      <Card className = "m-auto" style={{ width: "18rem"}}>
        <Card.Img
          variant="top"
          src={user.avatar}
          style={{
            width: "100%",
            height: "200px",
            objectFit: "cover"
          }}
        />
        {/* only show edit and delete button if currentuser === user */}
      {currentUser && currentUser._id === user._id && (
  <>
    <FaUserEdit
      style={{
        cursor: "pointer",
        position: "absolute",
        right: "40px",
        top: "10px",
        padding: "5px",
        fontSize: "2rem"
      }}
      onClick={() => setEditUserId(user._id)}
    />

    <MdDeleteForever
      style={{
        cursor: "pointer",
        position: "absolute",
        right: "10px",
        top: "10px",
        padding: "5px",
        fontSize: "2rem",
        backgroundColor: "purple",
        color: "white",
        borderRadius: "5px"
      }}
      onClick={deleteUser}
    />
  </>
)}



        <Card.Body>
          <Card.Title>@{user.username}</Card.Title>

          <Card.Text className="lead">{user.name}</Card.Text>

          <Card.Text className="text-muted">{user.email}</Card.Text>

          <Button variant="primary">Follow</Button>
        </Card.Body>
      </Card>
    </>
  );
}

export default User;
