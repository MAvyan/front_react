import React from 'react';
import { gql, useQuery } from '@apollo/client';
import { useNavigate } from 'react-router-dom';
import { DELETE_USER_MUTATION } from '../Mutation';
import DeleteButton from '../buttons/DeleteButton';
import editPenIcon from '../assets/edit-pen.svg'; // Import the edit-pen SVG icon

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
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">All Users</h2>
      <ul className="space-y-4">
        {data.listUsers.map((user) => (
          <li key={user.id} className="bg-gray-800 text-white p-4 rounded-lg shadow-md relative">
            {isAdmin && (
              <div className="absolute top-2 right-2 flex space-x-2">
                <img
                  src={editPenIcon}
                  alt="Edit User"
                  className="w-6 h-6 cursor-pointer"
                  onClick={() => handleEdit(user)}
                  style={{ filter: 'invert(100%)' }} // Apply filter to make the icon white
                />
                <DeleteButton
                  mutation={DELETE_USER_MUTATION}
                  variables={{ userId: user.id }}
                  onCompleted={() => navigate('/users')}
                />
              </div>
            )}
            <p className="text-xl font-semibold">Name: {user.fullname}</p>
            <p>ID: {user.id}</p>
            <p>Account: {user.isAdmin ? 'Admin' : 'Blogger'}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Users;