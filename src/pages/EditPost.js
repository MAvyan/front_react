import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { gql, useQuery } from '@apollo/client';
import PostForm from '../components/PostForm';
import { GET_POST_QUERY } from './PostDetail';

function EditPost() {
  const { id, slug } = useParams();
  const navigate = useNavigate();
  const [initialData, setInitialData] = useState({});

  const { data, loading, error } = useQuery(GET_POST_QUERY, {
    variables: { slug },
  });

  useEffect(() => {
    if (data && data.getPublication) {
      setInitialData(data.getPublication);
    }
  }, [data]);

  const handleSubmit = (updatedPost) => {
    // Update the post logic here
    navigate('/posts');
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <h2>Edit Post</h2>
      <PostForm initialData={initialData} onSubmit={handleSubmit} isEditMode={true} />
    </div>
  );
}

export default EditPost;