import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Posts() {
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const storedPosts = JSON.parse(localStorage.getItem('posts')) || [];
    setPosts(storedPosts);
  }, []);

  const handleViewDetails = (slug) => {
    navigate(`/post/${slug}`);
  };

  const handleViewProfile = (userId) => {
    navigate(`/user/${userId}`);
  };

  return (
    <div>
      <h2>All Posts</h2>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            <h3>{post.title}</h3>
            <p>{post.content}</p>
            <button onClick={() => handleViewDetails(post.slug)}>View Details</button>
            <button onClick={() => handleViewProfile(post.userId)}>View Profile</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Posts;