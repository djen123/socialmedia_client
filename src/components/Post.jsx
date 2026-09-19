import { useState, useEffect } from 'react';
import axios from '../api/axios';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Form from 'react-bootstrap/Form';
import { FaRegHeart } from "react-icons/fa";
import { FaRegComment } from "react-icons/fa6";
import { FiSend } from "react-icons/fi";
import { FaRegBookmark } from "react-icons/fa";
import { IoMdSend } from "react-icons/io";
import{ formatDistanceToNow } from 'date-fns';
import { useSelector } from 'react-redux'

function Post({ post }) {
  const currentUser = useSelector((store) => store.auth.currentUser)
  const [comments, setComments] = useState([])
  const [newComment, setNewComment] = useState('')

  const fetchComments = async () => {
    try {
      const res = await axios.get(`/comments?postId=${post._id}`)
      setComments(res.data.comments)
    } catch (error) {
      console.error('Error fetching comments:', error)
    }
  }

  useEffect(() => {
    fetchComments()
  }, [])

  async function handleAddComment() {
    try {
      const res = await axios.post('/comments', {
        content: newComment,
        post: post._id
      })
      alert(res.data.message)
      setNewComment('')
      fetchComments()
    } catch (error) {
      console.error('Error while adding comment:', error)
    }
  }

  return (
    <Card className='mx-auto mb-4'>
      <Card.Header className='border-0 d-flex align-items-start gap-2'>
        <img
          alt=""
          src={post.author.avatar}
          width="40"
          height="40"
          className="d-inline-block align-top rounded-circle"
        />
        <span>
          <b>{ post.author.name }</b>
          <div className='small'>{ post.author.bio?.length > 70 ? post.author.bio.substring(0, 70): post.author.bio }</div>
          <div className='small text-muted'>{formatDistanceToNow(post.createdAt, { addSuffix: true })}</div>
        </span>
      </Card.Header>
      <Card.Img variant="top" src={post.image} className='rounded-0' />
      <Card.Body>
        <div className='d-flex justify-content-between align-items-center fs-4 mb-2'>
          <div className='d-flex gap-3 align-items-center'>
            <FaRegHeart />
            <span className='d-flex gap-2 align-items-center'>
              <FaRegComment /> 
              <span className='fs-6'>{comments.length}</span>
            </span>
            <FiSend />
          </div>
          <FaRegBookmark />
        </div>
        <Card.Text>
          <b>@{ post.author.username }</b>{' '}{ post.content }
        </Card.Text>
        {currentUser && (
          <div className='d-flex gap-2 align-items-center mb-2'>
            <img
              alt=""
              src={currentUser.avatar}
              width="24"
              height="24"
              className="d-inline-block align-top rounded-circle"
            />
            <Form.Control 
              type="text" 
              placeholder="Add comment ..." 
              value={newComment}
              onInput={(e) => setNewComment(e.target.value)}
            />
            <IoMdSend className='fs-3' onClick={handleAddComment} />
          </div>
        )}
        <ListGroup className="list-group-flush">
          {comments.map((comment) => (
            <ListGroup.Item key={comment._id} style={{ paddingLeft: 0 }}>
              <div className='d-flex gap-2'>
                <img
                  alt=""
                  src={comment.author.avatar}
                  width="24"
                  height="24"
                  className="d-inline-block align-top rounded-circle mt-1"
                />
                <div>
                  <b>{ comment.author.name }</b>
                  <div className='small'>{ comment.author.bio?.length > 70 ? comment.author.bio.substring(0, 70): comment.author.bio }</div>
                  <div className='mt-1'>{comment.content}</div>
                </div>
              </div>
            </ListGroup.Item>
          ))}
        </ListGroup>
      </Card.Body>
    </Card>
  );
}

export default Post;