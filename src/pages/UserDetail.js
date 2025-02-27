import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { gql, useQuery } from '@apollo/client';
import { GET_USER_QUERY } from '../Query';
import { DELETE_USER_MUTATION } from '../Mutation';
import DeleteButton from '../buttons/DeleteButton';
import readIcon from '../assets/read.svg'; // Import the read SVG icon
import leftArrowIcon from '../assets/left-arrow.svg'; // Import the left-arrow SVG icon

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
    <div className="container mx-auto p-4">
      <div className="bg-gray-800 text-white p-6 rounded-lg shadow-md relative">
        <img
          src={leftArrowIcon}
          alt="Back"
          onClick={() => navigate(-1)}
          style={{ filter: 'invert(100%)' }}
          className="absolute top-2 left-2 w-6 h-6"
        />
        {isAdmin && (
          <div className="absolute top-2 right-2">
            <DeleteButton
              mutation={DELETE_USER_MUTATION}
              variables={{ userId: user.id }}
              onCompleted={() => navigate('/users')}
            />
          </div>
        )}
        <h2 className="text-3xl font-bold mb-2">{user.fullname}</h2>
        <p>ID: {user.id}</p>
        <p>Admin: {user.isAdmin ? 'Yes' : 'No'}</p>
        <p>Password: {user.password}</p>
        <h3 className="text-2xl font-bold mt-4">Posts:</h3>
        <ul className="space-y-4">
          {user.posts.map((post) => (
            <li key={post.id} className="bg-gray-700 text-white p-4 rounded-lg shadow-md flex justify-between items-center">
              <div>
                <p className="text-xl font-semibold">Title: {post.title}</p>
              </div>
              <div onClick={() => navigate(`/post/${post.slug}`)} className="cursor-pointer flex items-center space-x-2">
                <img src={readIcon} alt="View Post" className="w-6 h-6" style={{ filter: 'invert(100%)' }} />
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default UserDetail;