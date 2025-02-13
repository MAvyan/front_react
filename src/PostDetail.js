import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import users from './Data.json';

function PostDetail() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [author, setAuthor] = useState(null);

  useEffect(() => {
    const storedPosts = JSON.parse(localStorage.getItem('posts')) || [];
    const foundPost = storedPosts.find((post) => post.slug === slug);
    setPost(foundPost);

    if (foundPost) {
      const foundAuthor = users.find((user) => user.id === foundPost.userId);
      setAuthor(foundAuthor);
    }
  }, [slug]);

  if (!post) {
    return <div>Post not found</div>;
  }

  return (
    <div>
      <h2>{post.title}</h2>
      <p>{post.content}</p>
      <p>Created at: {new Date(post.createdAt).toLocaleDateString()}</p>
      {author && <p>Author: {author.username}</p>}
      <button onClick={() => navigate(-1)}>Return</button>
    </div>
  );
}

export default PostDetail;