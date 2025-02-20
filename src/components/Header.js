import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { LOG_OUT_MUTATION } from '../Mutation';
import { SEARCH_PUBLICATIONS_QUERY } from '../Query';
import { useLazyQuery } from '@apollo/client';

function Header() {
  const navigate = useNavigate();
  const isConnected = localStorage.getItem('isConnected');
  const [searchTerm, setSearchTerm] = useState('');

  const [logOut] = useMutation(LOG_OUT_MUTATION, {
    onCompleted: () => {
      localStorage.removeItem('isConnected');
      navigate('/');
    }
  });

  const [searchPublications, { data }] = useLazyQuery(SEARCH_PUBLICATIONS_QUERY, {
    variables: { term: searchTerm },
  });

  const handleLogout = () => {
    logOut();
  };

  const handleSearch = (e) => {
    e.preventDefault();
    searchPublications();
    navigate('/search-results', { state: { results: data?.searchPublications } });
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
            <Link to="/users">Users</Link>
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
        <form onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button type="submit">Search</button>
        </form>
      </nav>
    </header>
  );
}

export default Header;