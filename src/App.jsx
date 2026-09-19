import { useState, useEffect } from 'react'
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router'
import { Container } from 'react-bootstrap'
import AppNavbar from './components/AppNavbar'
import Landing from './pages/Landing'
import Signup from './pages/Signup'
import Login from './pages/Login'
import Network from './pages/Network'
import Posts from './pages/Posts'
import Profile from './pages/Profile'
import ProtectedRoute from './components/ProtectedRoute'
import PublicOnlyRoute from './components/PublicOnlyRoute'
import { useDispatch } from 'react-redux'
import { checkAuth } from './store/actions/auth.js'

function App() {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(checkAuth())
  }, [dispatch])

  return (
    <BrowserRouter>
      <AppNavbar />
      <Container className='mt-5'>
        <Routes>
          <Route path="/" element={ 
            <PublicOnlyRoute> 
              <Landing /> 
            </PublicOnlyRoute> } />
          <Route path="/signup" element={ 
            <PublicOnlyRoute> 
              <Signup /> 
            </PublicOnlyRoute> }/>
          <Route path="/login" element={ 
            <PublicOnlyRoute> 
              <Login /> 
            </PublicOnlyRoute> }/>
          <Route path="/network" element={ 
            <ProtectedRoute> 
              <Network /> 
            </ProtectedRoute> } />
          <Route path="/feed" element={ 
            <ProtectedRoute> 
              <Posts />
            </ProtectedRoute> }/>
          <Route path="/jobs" element={ 
            <ProtectedRoute> 
              <></>
            </ProtectedRoute> }/>
          <Route path="/in/:username" element={ <Profile /> }/>
        </Routes>
      </Container>
    </BrowserRouter>
  )
}

export default App

/*
  Plan for next day:
  4. Push code to Gthub + Hosting
*/
