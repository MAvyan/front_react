import React from 'react';
import { gql, useQuery } from '@apollo/client';
import { useNavigate } from 'react-router-dom';
import { DELETE_USER_MUTATION } from '../Mutation';
import DeleteButton from '../buttons/DeleteButton';

export const LIST_USERS_QUERY = gql`
  query ListUsersQuery {
    listUsers {
      id
      fullname
      isAdmin
    }
  }
`;

function Users() {
  const { data, loading, error } = useQuery(LIST_USERS_QUERY);
  const navigate = useNavigate();

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  const handleEdit = (user) => {
    navigate(`/update-user/${user.id}`, { state: { user } });
  };

  const currentUser = JSON.parse(localStorage.getItem('user'));
  const isAdmin = currentUser?.isAdmin;

  return (
    <div>
      <h2>All Users</h2>
      <ul>
        {data.listUsers.map((user) => (
          <li key={user.id}>
            <p>Name: {user.fullname}</p>
            <p>ID: {user.id}</p>
            <p>Account: {user.isAdmin ? 'Admin' : 'Blogger'}</p>
            <button onClick={() => handleEdit(user)}>Edit</button>
            {isAdmin && (
              <DeleteButton
                mutation={DELETE_USER_MUTATION}
                variables={{ userId: user.id }}
                onCompleted={() => navigate('/users')}
              />
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Users;