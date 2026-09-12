import { useEffect, useState } from "react";
import axios from "../api/axios.js";
import Post from "../components/Post.jsx";

const Posts = ({ currentUser }) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchPosts = async () => {
    try {
      const res = await axios.get("/posts");
      setPosts(res.data.posts); // backend returns { posts: [...] }
    } catch (error) {
      console.error("Error fetching posts:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div className="text-center mt-4">

      {/* Loading State */}
      {loading && (
        <div className="text-muted mt-5">
          <h5>Loading posts...</h5>
        </div>
      )}

      {/* Empty State */}
      {!loading && Array.isArray(posts) && posts.length === 0 && (
        <div className="text-muted mt-5">
          <h5>No posts yet 😅</h5>
          <p>Be the first to share something!</p>
        </div>
      )}

      {/* Posts List */}
      {!loading && Array.isArray(posts) && posts.length > 0 && (
        posts.map((post) => (
          <Post key={post._id} post={post} currentUser={currentUser} />
        ))
      )}

    </div>
  );
};

export default Posts;
