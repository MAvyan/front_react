import React from 'react';
import { gql, useQuery } from '@apollo/client';

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

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <h2>All Users</h2>
      <ul>
        {data.listUsers.map((user) => (
          <li key={user.id}>
            <p>Name: {user.fullname}</p>
            <p>ID: {user.id}</p>
            <p>Account : {user.isAdmin ? 'Admin' : 'Blogger'}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Users;