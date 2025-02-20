import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { gql, useQuery } from '@apollo/client';
import { DELETE_POST_MUTATION } from '../Mutation';
import DeleteButton from '../buttons/DeleteButton';

export const GET_POST_QUERY = gql`
  query GetPostQuery($slug: String!) {
    getPublication(slug: $slug) {
      id
      title
      slug
      body
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

  const user = JSON.parse(localStorage.getItem('user'));
  const isAdmin = user?.isAdmin;

  return (
    <div>
      <h2>{post.title}</h2>
      <p>ID: {post.id}</p>
      <p>Slug: {post.slug}</p>
      <p>Body: {post.body}</p>
      {isAdmin && (
        <DeleteButton
          mutation={DELETE_POST_MUTATION}
          variables={{ postId: post.id }}
          onCompleted={() => navigate('/posts')}
        />
      )}
      <button onClick={() => navigate(-1)}>Retour</button>
    </div>
  );
}

export default PostDetail;