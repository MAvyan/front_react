import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { gql, useQuery } from '@apollo/client';
import PostForm from './PostForm';
import { GET_POST_QUERY } from './PostDetail';

function EditDraft() {
  const { id, slug } = useParams();
  const navigate = useNavigate();
  const [initialData, setInitialData] = useState({});

  const { data, loading, error } = useQuery(GET_POST_QUERY, {
    variables: { slug },
  });
  console.log(data);

  useEffect(() => {
    if (data && data.getPublication) {
      setInitialData(data.getPublication);
    }
  }, [data]);

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

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <h2>Edit Draft</h2>
      <PostForm initialData={initialData} onSubmit={handleSubmit} isEditMode />
    </div>
  );
}

export default EditDraft;