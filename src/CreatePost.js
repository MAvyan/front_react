import React from 'react';
import { useNavigate } from 'react-router-dom';
import PostForm from './PostForm';

function CreatePost() {
  const navigate = useNavigate();

  const handleSubmit = (postData, isDraft) => {
    const storageKey = isDraft ? 'drafts' : 'posts';
    const existingPosts = JSON.parse(localStorage.getItem(storageKey)) || [];
    existingPosts.push(postData);
    localStorage.setItem(storageKey, JSON.stringify(existingPosts));

    if (!isDraft) {
      navigate('/');
    } else {
      navigate(-1);
    }
  };

  return (
    <div>
      <h2>Create Post</h2>
      <PostForm onSubmit={handleSubmit} isDraft />
    </div>
  );
}

export default CreatePost;