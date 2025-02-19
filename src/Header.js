import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import users from './Data.json';
import { gql, useMutation } from '@apollo/client';

const LOG_OUT_MUTATION = gql`
  mutation LogOutMutation {
    logOut {
      id
    }
  }`;

function Header() {
  const navigate = useNavigate();
  const isConnected = localStorage.getItem('isConnected');
  //const currentUser = userId ? users.find(user => user.id === parseInt(userId)) : null;

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
            <>
              <li>
                <Link to="/drafts">Drafts</Link>
              </li>
              <li>
                <Link to="/create-post">Create Post</Link>
              </li>
            </>
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