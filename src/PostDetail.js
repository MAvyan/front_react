import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { gql, useQuery } from '@apollo/client';

export const GET_POST_QUERY = gql`
  query GetPostQuery($slug: String!) {
    getPublication(slug: $slug) {
      id
      title
      body
      publishedAt
      user {
        id
        fullname
      }
    }
  }
`;

function PostDetail() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { data, loading, error } = useQuery(GET_POST_QUERY, {
    variables: { slug },
  });

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  const post = data?.getPublication;

  if (!post) {
    return <div>Post not found</div>;
  }

  return (
    <div>
      <h2>{post.title}</h2>
      <p>{post.body}</p>
      <p>Published at: {new Date(post.publishedAt).toLocaleDateString()}</p>
      <p>Author: {post.user.fullname}</p>
      <button onClick={() => navigate(-1)}>Back</button>
    </div>
  );
}

export default PostDetail;