import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { CiEdit } from "react-icons/ci";
import { MdDelete } from "react-icons/md";
import axios from '../api/axios.js';
import { useState } from 'react';
import { HiUserAdd } from "react-icons/hi";
import { FaCheck } from "react-icons/fa6";
import { fetchConnections } from '../store/actions/network.js'
import { useDispatch, useSelector } from 'react-redux'

function User({ user, isProfilePage = false }) {
  const dispatch = useDispatch()
  const connections = useSelector((state) => state.network.connections)
  const receivedRequests = useSelector((state) => state.network.receivedRequests)
  const sentRequests = useSelector((state) => state.network.sentRequests)

  const handleConnect = async () => {
    try {
      const res = await axios.post('/network/connections', { recipient: user._id })
      alert(res.data.message)
      dispatch(fetchConnections())
    } catch (error) {
      console.error('Error while connecting to user:', error)
    }
  }

  const handleAcceptConnection = async () => {
    try {
      const res = await axios.post('/network/connections/accept', { requester: user._id })
      alert(res.data.message)
      dispatch(fetchConnections())
    } catch (error) {
      console.error('Error while accepting connection:', error)
    }
  }

  const isAlreadyConnected = connections.some(connection => connection._id === user._id)
  const isAlreadySentRequest = sentRequests.some(request => request._id === user._id)
  const isAlreadyReceivedRequest = receivedRequests.some(request => request._id === user._id)

  let buttonJsx = (
      <Button 
        variant="outline-primary"
        onClick={handleConnect}
      >
        <HiUserAdd />{' '}
        Connect
      </Button>
  )

  if (isAlreadySentRequest) {
    buttonJsx = (
      <Button 
        variant="outline-primary"
        onClick={handleConnect}
      >
        <FaCheck />{' '}
        Requested
      </Button>
    )
  }

  if (isAlreadyReceivedRequest) {
    buttonJsx = (
      <Button 
        variant="primary"
        onClick={handleAcceptConnection}
      >
        <FaCheck />{' '}
        Accept
      </Button>
    )
  }
  
  return (
    <>
      <Card className='d-flex justify-content-around' style={{ width: '18rem' ,height:"18rem"} }>
        <Card.Img variant="top" src={user.coverImage} />
        <div className='text-center' style={{ marginTop: '-50px' }}>
          <img 
          // user is all user not just current user
            src={user.avatar} 
            alt="profile-picture" 
            className='rounded-circle' 
            width="120"
            height="120"
          />
        </div>
        <Card.Body>
          <Card.Title>{user.name}</Card.Title>
          <Card.Text className='text-muted'>
            {user.bio?.length > 90 ?
              `${user.bio.substring(0, 90)}...` :
              user.bio
            }
          </Card.Text>
          {!isProfilePage && !isAlreadyConnected && buttonJsx}
        </Card.Body>
      </Card>
    </>
  );
}

export default User;