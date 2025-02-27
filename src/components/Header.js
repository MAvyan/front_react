import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { LOG_OUT_MUTATION } from '../Mutation';
import logoutIcon from '../assets/logout.svg'; // Import the SVG asset
import addUserIcon from '../assets/add_user.svg'; // Import the new SVG asset
import createPostIcon from '../assets/create_post.svg'; // Import the new SVG asset

function Header() {
  const navigate = useNavigate();
  const isConnected = localStorage.getItem('isConnected');
  const user = JSON.parse(localStorage.getItem('user'));
  const isAdmin = user?.isAdmin;
  const [searchTerm, setSearchTerm] = useState('');

  const [logOut] = useMutation(LOG_OUT_MUTATION, {
    onCompleted: () => {
      localStorage.removeItem('isConnected');
      localStorage.removeItem('user');
      navigate('/login');
    }
  });

  const handleLogout = () => {
    logOut();
  };

  const handleSearch = (e) => {
    e.preventDefault();
    navigate('/search-results', { state: { searchTerm } });
  };

  return (
    <header className="bg-gray-800 text-white p-4">
      <nav className="container mx-auto flex justify-between items-center">
        <ul className="flex space-x-3">
          <li>
            <Link to="/" className="hover:text-gray-400">Posts</Link>
          </li>
          {isAdmin && (
            <>
              <li>
                <Link to="/drafts" className="hover:text-gray-400">Drafts</Link>
              </li>
              <li>
                <Link to="/users" className="hover:text-gray-400">Users</Link>
              </li>
            </>
          )}
        </ul>
        <form onSubmit={handleSearch} className="flex space-x-2 mx-auto">
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="px-2 rounded bg-gray-700 text-white w-96"
          />
          <button type="submit" className="p-2 bg-blue-500 rounded hover:bg-blue-600">Search</button>
        </form>
        <ul className="flex space-x-4 items-center">
          {isAdmin && (
            <>
              <li>
                <Link to="/create-post" className="flex items-center space-x-2 bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
                  <img src={createPostIcon} alt="Create Post" className="w-5 h-5" />
                </Link>
              </li>
              <li>
                <Link to="/create-user" className="flex items-center space-x-2 bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
                  <img src={addUserIcon} alt="Create User" className="w-5 h-5" />
                </Link>
              </li>
            </>
          )}
          <li>
            {isConnected ? (
              <button onClick={handleLogout} className="flex items-center space-x-2 bg-red-500 text-white p-2 rounded hover:bg-red-600">
                <img src={logoutIcon} alt="Log Out" className="w-5 h-5" />
              </button>
            ) : (
              <Link to="/login" className="hover:text-gray-400">Log In</Link>
            )}
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;