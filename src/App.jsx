import "./App.css";
import { useState,useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router";
import { Container } from "react-bootstrap";

import axios from "./api/axios.js";
import AppNavBar from "./components/AppNavbar.jsx";
import Landing from "./pages/Landing.jsx";
import Signup from "./pages/Signup.jsx";
import Login from "./pages/Login.jsx";
import Posts from "./pages/Posts.jsx";


function App() {
  const [users, setUsers] = useState([]);
  const [currentUser,setCurrentUser] = useState(null)
  const fetchUsers = async () => {
    try {
      const response = await axios.get("/users");
      setUsers(response.data.users);
    } catch (error) {
      
      if(error.response && error.response.status === 401){
        setCurrentUser(null) // when loggedin currentuser is set to current user id if not then set it to null
        return
      }
      console.error("Error fetching users:", error);
    }
  };

    const fetchCurrentUser = async () => {
    try {
      const response = await axios.get("/users/me");
      setCurrentUser(response.data.user);
    } catch (error) {
      console.error("Error fetching current user:", error);
    }
  };
  //function that clears currentUser
const logoutFrontEnd = () => {
  setCurrentUser(null);
}
  useEffect(()=>{
    fetchCurrentUser()

  },[])
  
  return (
    <BrowserRouter>
      <AppNavBar
      currentUser = {currentUser}  logoutFrontEnd ={logoutFrontEnd}/>


      <Container className="mt-5">
        <Routes>
          <Route
            path="/"
            element={<Landing fetchUsers={fetchUsers} users={users} currentUser = {currentUser} />}
          />

          <Route path="/login" element={<Login fetchCurrentUser = {fetchCurrentUser}/>}  />

          <Route
            path="/signup"
            element={<Signup fetchUsers={fetchUsers} fetchCurrentUser = {fetchCurrentUser} />}
          />
         <Route
            path="/posts"
            element={<Posts currentUser={currentUser}/>}
          />
        </Routes>
      </Container>
    </BrowserRouter>
  );
}

export default App;
