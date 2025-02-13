import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import PostForm from './PostForm';

function EditDraft() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [initialData, setInitialData] = useState({});

  useEffect(() => {
    const storedDrafts = JSON.parse(localStorage.getItem('drafts')) || [];
    const draft = storedDrafts.find((d) => d.id === parseInt(id));
    if (draft) {
      setInitialData(draft);
    }
  }, [id]);

  const handleSubmit = (updatedDraft, isConfirmed) => {
    let storedDrafts = JSON.parse(localStorage.getItem('drafts')) || [];
    if (isConfirmed) {
      // Remove the draft from drafts
      storedDrafts = storedDrafts.filter((d) => d.id !== parseInt(id));
      localStorage.setItem('drafts', JSON.stringify(storedDrafts));

      // Add the draft to posts
      const storedPosts = JSON.parse(localStorage.getItem('posts')) || [];
      storedPosts.push(updatedDraft);
      localStorage.setItem('posts', JSON.stringify(storedPosts));
    } else {
      // Update the draft in drafts
      const updatedDrafts = storedDrafts.map((d) => (d.id === parseInt(id) ? updatedDraft : d));
      localStorage.setItem('drafts', JSON.stringify(updatedDrafts));
    }
    navigate('/drafts');
  };

  return (
    <div>
      <h2>Edit Draft</h2>
      <PostForm initialData={initialData} onSubmit={handleSubmit} />
    </div>
  );
}

export default EditDraft;