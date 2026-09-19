import { useState, useEffect } from 'react'
import User from '../components/User'
import axios from '../api/axios'
import Post from '../components/Post'
import { Row, Col, Form, Button } from 'react-bootstrap'
import { useSelector } from 'react-redux'

const wrapperStyle = {
  margin: '0',
  padding: '20px',
  boxShadow: 'rgba(0, 0, 0, 0.16) 0px 1px 4px',
  backgroundColor: 'white',
  borderRadius: '6px'
}

function Posts() {
  const [posts, setPosts] = useState([])
  const currentUser = useSelector((store) => store.auth.currentUser)
  const [user, setUser] = useState({})
  const [newPost, setNewPost] = useState({
    content: '',
    image: ''
  })

  const fetchPosts = async () => {
    try {
      const res = await axios.get('/posts')
      setPosts(res.data.posts)
    } catch (error) {
      console.error('Error fetching posts:', error)
    }
  }

  useEffect(() => {
    fetchPosts()
  }, [])

  const fetchUserProfile = async () => {
    try {
      const res = await axios.get(`/users/username/${currentUser.username}`)
      setUser(res.data.user)
    } catch (error) {
      console.error('Error fetching user profile:', error)
    }
  }

  useEffect(() => {
    //only run fetchUserProfile when currentuser is there or changed ,get user and pass it to <user component/>
    if(currentUser)
      fetchUserProfile()
  }, [currentUser])

  const handlePost = async () => {
    try {
      const res = await axios.post('/posts', newPost)
      alert(res.data.message)
      fetchPosts()
    } catch (error) {
      if(error.response && (error.response.status === 401 || error.response.status === 403)) {
        alert(error.response.data.message)
        return
      }
      console.error('Error while adding a post:', error)
    }
  }

  return (
    <div>
      <Row>
        <Col md={4} className='text-center'>
          <User user={user} isProfilePage={true} />
        </Col>
        <Col md={8} style={{ maxWidth: '600px' }}>
          <div className='d-flex gap-2 mb-2' style={wrapperStyle}>
            <img
              alt=""
              src={user.avatar}
              width="40"
              height="40"
              className="d-inline-block align-top rounded-circle"
            />
            <Form className='w-100'>
              <Form.Group className="mb-3">
                <Form.Control 
                  placeholder="What's on your mind?"
                  as="textarea" 
                  rows={5} 
                  value={newPost.content}
                  onChange={(e) => setNewPost({...newPost, content: e.target.value})}
                />
              </Form.Group>
               <Form.Group className="mb-3">
                <Form.Control 
                  type="text" 
                  placeholder="Image URL" 
                  value={newPost.image}
                  onChange={(e) => setNewPost({...newPost, image: e.target.value})}
                />
              </Form.Group>
               <Button variant="primary" className='w-100'
                 onClick={handlePost}
               >Post</Button>
            </Form>
          </div>

          <div>
            {posts.map((post) => (
              <Post 
                key={post._id} 
                post={post} 
              />
            ))}
          </div>
        </Col>
      </Row>
    </div>
  );
}

export default Posts;