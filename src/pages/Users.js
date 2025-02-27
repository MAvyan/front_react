import React, { useState } from 'react';
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
  const { data } = useQuery(LIST_USERS_QUERY);
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 4; // Change the number of users per page to 4

  const handleEdit = (user) => {
    navigate(`/update-user/${user.id}`, { state: { user } });
  };

  const currentUser = JSON.parse(localStorage.getItem('user'));
  const isAdmin = currentUser?.isAdmin;

  const totalPages = data ? Math.ceil(data.listUsers.length / usersPerPage) : 0;
  const currentUsers = data ? data.listUsers.slice((currentPage - 1) * usersPerPage, currentPage * usersPerPage) : [];

  const handlePageClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-10 text-center">All Users</h2>
      <div className="min-h-[calc(100vh-300px)] flex flex-col justify-between"> {/* Adjust the min-height as needed */}
        <ul className="space-y-4">
          {currentUsers.map((user) => (
            <li key={user.id} className="bg-gray-800 text-white p-4 rounded-2xl shadow-2xl relative">
              {isAdmin && (
                <div className="absolute top-2 right-2 flex space-x-2 mt-2 mr-2">
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
        <div className="flex justify-center mt-4 space-x-2">
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index + 1}
              onClick={() => handlePageClick(index + 1)}
              className={`px-3 py-1 rounded ${currentPage === index + 1 ? 'bg-blue-500 text-white' : 'bg-gray-700 text-white'}`}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Users;