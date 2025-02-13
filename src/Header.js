import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import users from './Data.json';

function Header() {
  const navigate = useNavigate();
  const isAuthenticated = localStorage.getItem('isAuthenticated');
  const userId = localStorage.getItem('userId'); // Retrieve user ID
  const currentUser = isAuthenticated && userId ? users.find(user => user.id === parseInt(userId)) : null;

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('userId'); // Remove user ID
    navigate('/login');
  };

  return (
    <header>
      <nav>
        <ul>
          <li>
            <Link to="/">Posts</Link>
          </li>
          {currentUser && currentUser.role === 'admin' && (
            <>
              <li>
                <Link to="/drafts">Drafts</Link>
              </li>
              <li>
                <Link to="/create-post">Create Post</Link>
              </li>
            </>
          )}
          <li>
            {isAuthenticated ? (
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