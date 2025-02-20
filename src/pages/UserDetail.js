import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { gql, useQuery } from '@apollo/client';
import { GET_USER_QUERY } from '../Query';
import { DELETE_USER_MUTATION } from '../Mutation';
import DeleteButton from '../buttons/DeleteButton';

function UserDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data, loading, error } = useQuery(GET_USER_QUERY, {
    variables: { id },
  });

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  const user = data?.getUser;

  if (!user) {
    return <div>User not found</div>;
  }

  const currentUser = JSON.parse(localStorage.getItem('user'));
  const isAdmin = currentUser?.isAdmin;

  return (
    <div>
      <h2>{user.fullname}</h2>
      <p>ID: {user.id}</p>
      <p>Admin: {user.isAdmin ? 'Yes' : 'No'}</p>
      <p>Password: {user.password}</p>
      <h3>Posts:</h3>
      <ul>
        {user.posts.map((post) => (
          <li key={post.id}>
            <p>Title: {post.title}</p>
            <button onClick={() => navigate(`/post/${post.slug}`)}>View Post</button>
          </li>
        ))}
      </ul>
      {isAdmin && (
        <DeleteButton
          mutation={DELETE_USER_MUTATION}
          variables={{ userId: user.id }}
          onCompleted={() => navigate('/users')}
        />
      )}
      <button onClick={() => navigate(-1)}>Retour</button>
    </div>
  );
}

export default UserDetail;