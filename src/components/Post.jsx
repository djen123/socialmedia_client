import Card from "react-bootstrap/Card";
import { useState, useEffect } from "react";
import { FaHeart, FaCommentAlt } from "react-icons/fa";
import { IoIosSend } from "react-icons/io";
import { CiBookmark } from "react-icons/ci";
import { formatDistanceToNow } from "date-fns";
import ListGroup from "react-bootstrap/ListGroup";
import axios from "../api/axios";
import CardHeader from "react-bootstrap/esm/CardHeader";
import Form from 'react-bootstrap/Form'
import { LuSendHorizontal } from "react-icons/lu";

function Post({ post, currentUser }) {
  const [comments, setComments] = useState([]);
  {/* new state from new comments */}
  const [newComment,setNewComment] = useState("")


  const fetchComments = async () => {
    try {
      const res = await axios.get(`/comments?postId=${post._id}`);
      setComments(res.data.comments);
      console.log(res)
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  };
  
  const handleComment = async()=>{
    try{
      const res  = await axios.post('/comments',{
        content: newComment,
        post : post._id

      })
      console.log(res)
      setNewComment(" ")
      fetchComments()

    }catch(e){
      console.log(e)
    }
  }

  useEffect(() => {
    fetchComments();
  }, []);

  return (
    <Card className="mb-4 mx-auto" style={{ width: "22rem" }}>
      <CardHeader className = "d-flex jusitfy-content-start border-0">
        <img
       alt ="image"
       src={post.author.avatar}
       width ="24"
       height ="24"
       className = "d-inline-block align-top rounded-circle"
       />
       {" "}
      <b>{post.author.name}</b>
      </CardHeader>
      <Card.Img
        variant="top"
        src={post.image || "https://via.placeholder.com/300x200?text=No+Image"}
      />

      <Card.Body>
        {/* Icons */}
        <div className="d-flex justify-content-between align-items-center fs-4 mb-2">
          <div className="d-flex gap-2 align-items-center fs-5">
            <FaHeart />
            <FaCommentAlt />
            <IoIosSend />
          </div>
          <CiBookmark />
        </div>

        {/* Author + content */}
        <Card.Text>
          <b>@{post.author?.name || "Unknown User"}</b> — {post.content}
        </Card.Text>

        {/* Timestamp */}
        <Card.Text className="text-muted">
          {new Date(post.createdAt).toLocaleString()}
        </Card.Text>

        <Card.Text className="text-muted">
          {formatDistanceToNow(new Date(post.createdAt))} ago
        </Card.Text>
        
        {/* Comments only show or allow if users is logged in or currentUser*/}
        {
          currentUser &&(
          <div className = "d-flex align-items-center gap-2 mb-2">
               <img
       alt ="image"
       src={currentUser.avatar}
       width ="24"
       height ="24"
       className = "d-inline-block align-top rounded-circle"
       />
        <Form.Control
  type="text"
  placeholder="Add comments"
  value={newComment}
  onChange={(e) => setNewComment(e.target.value)}
/>
 <LuSendHorizontal className = "fs-3" onClick = {handleComment} />

          </div>
          )
        }


         

        {/* Comments — moved OUTSIDE <p> */}
      {Array.isArray(comments) && comments.length > 0 ? (
  <ListGroup className="list-group-flush">
    {comments.map((comment) => (
      <ListGroup.Item key={comment._id} className = "d-flex justify-content-start mb-2">
       <img
       alt ="image"
       src={comment.author.avatar}
       width ="24"
       height ="24"
       className = "d-inline-block align-top rounded-circle"
       />

        <b>@{comment.author.name}</b> : {comment.content}
      </ListGroup.Item>
    ))}
  </ListGroup>
) : (
  <p className="text-muted">No comments yet</p>
)}

        {/* Current user badge */}
        {currentUser && currentUser._id === post.author?._id && (
          <Card.Text className="text-success">You posted this</Card.Text>
        )}
      </Card.Body>
    </Card>
  );
}

export default Post;
