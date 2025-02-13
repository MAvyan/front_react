import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import users from './Data.json';

function UserDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const user = users.find((user) => user.id === parseInt(id));

  console.log('User ID:', id);
  console.log('User:', user);

  if (!user) {
    return <div>User not found</div>;
  }

  return (
    <div>
      <h2>{user.fullname}</h2>
      <p>First Name: {user.firstName}</p>
      <p>Last Name: {user.lastName}</p>
      <p>Username: {user.username}</p>
      <p>Email: {user.email}</p>
      <p>Created at: {new Date(user.createdAt).toLocaleDateString()}</p>
      <button onClick={() => navigate(-1)}>Retour</button>
    </div>
  );
}

export default UserDetail;