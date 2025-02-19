import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { LOG_OUT_MUTATION } from '../Mutation';

function Header() {
  const navigate = useNavigate();
  const isConnected = localStorage.getItem('isConnected');

  const [logOut] = useMutation(LOG_OUT_MUTATION, {
    onCompleted: () => {
      localStorage.removeItem('isConnected');
      navigate('/');
    }
  });

  const handleLogout = () => {
    logOut();
  };

  return (
    <header>
      <nav>
        <ul>
          <li>
            <Link to="/">Posts</Link>
          </li>
          <li>
            <Link to="/drafts">Drafts</Link>
          </li>
          <li>
            <Link to="/create-post">Create Post</Link>
          </li>
          <li>
            <Link to="/users">Users</Link> {/* New link */}
          </li>
          <li>
            <Link to="/create-user">Create User</Link>
          </li>
          <li>
            {isConnected ? (
              <button onClick={handleLogout}>Log out</button>
            ) : (
              <Link to="/login">Log In</Link>
            )}
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;