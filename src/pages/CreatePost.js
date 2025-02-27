import React from 'react';
import { useNavigate } from 'react-router-dom';
import PostForm from '../components/PostForm';

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
    <div className="flex justify-center items-center min-h-screen">
      <PostForm initialData={{}} onSubmit={handleSubmit} isEditMode={false} />
    </div>
  );
}

export default CreatePost;